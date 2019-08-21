import React from 'react';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Table, Divider, Popconfirm,
  message, Button, Icon,
} from 'antd';
import server from '../../feathers';

// rowSelection object indicates the need for row selection
const rowSelectionAction = (action) => {
  if (!action.onChange) throw new Error('rowSelection must have onChange function');
  return {
    onChange: action.onChange,
    getCheckboxProps: action.getCheckboxProps && action.getCheckboxProps,
  };
};

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      totalData: 0,
      loading: true,
    };
    // browser history for redirect;
    this.history = props.history;
    const { actions, fetchData: { path } } = props;
    props.columns.push({
      title: <FormattedMessage id="cards.table.control" defaultMessage="Control" />,
      key: 'control',
      fixed: 'right',
      render: (record) => (
        <span>
          {actions.edit.show && (
          <Button
            type="primary"
            shape="circle-outline"
            icon="edit"
            title={`Edit ${props.entityName}`}
            onClick={() => this.history.push(actions.edit.redirectUrl || `/${path}/edit/${record._id}`)}
          />
          )}
          {actions.remove && (
          <>
            {' '}
            <Divider type="vertical" />
            <Popconfirm
              icon={<Icon type="delete" />}
              title={(
                <FormattedMessage
                  id="DataTable.pop.delete"
                  defaultMessage={`Sure to delete this ${props.entityName} ?`}
                  values={{ entityName: props.entityName }}
                />
              )}
              onConfirm={() => this.handleDelete(record._id)}
            >
              <Button
                type="danger"
                shape="circle-outline"
                icon="delete"
                title={`Remove ${props.entityName}`}
              />
            </Popconfirm>
          </>
          )}
        </span>
      ),
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  handleDelete = (id) => {
    const { fetchData: { path }, entityName } = this.props;
    server.service(path).remove(id)
      .then(() => {
        const { currentPage } = this.state;
        this.fetchData(currentPage);
        message.success(`${entityName} deleted successfully `);
      }).catch((err) => {
        if (err.code !== 500) {
          message.error(err.message);
        } else {
          message.error('Something went wrong, Please try later');
        }
      });
  }

  fetchData(page) {
    const { fetchData, pagination: { pageSize } } = this.props;
    server.service(fetchData.path).find({
      query: {
        $skip: ((page && page - 1) || 0) * pageSize,
        $limit: pageSize,
        ...fetchData.query,
      },
    }).then((fetchedData) => {
      this.setState({
        data: fetchedData.data,
        loading: false,
        totalData: fetchedData.total,
        currentPage: page || 1,
      });
    }).catch((err) => {
      if (err.code !== 500) {
        message.error(err.message);
      } else {
        message.error('Something went wrong, Please try later');
      }
    });
  }

  render() {
    const {
      data, totalData, loading, currentPage,
    } = this.state;
    const {
      pagination, rowSelection, columns, size,
    } = this.props;

    const rowSlc = rowSelection ? {
      rowSelection: rowSelectionAction(rowSelectionAction),
    } : {};

    return (
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        scroll={{ x: 900 }}
        rowKey={(record) => record._id}
        size={size}
        {...rowSlc}
        rowClassName="table__row"
        // onRow={(record, rowIndex) => ({
        //   onDoubleClick: (event) => this.history.push(`/cards/${record.id}`),
        // })}
        pagination={{
          hideOnSinglePage: true,
          current: currentPage,
          position: pagination.position,
          total: totalData,
          defaultCurrent: 0,
          pageSize: pagination.pageSize,
          onChange: (page) => {
            // get new next paginated cards
            this.fetchData(page);
          },
        }}
      />
    );
  }
}

DataTable.defaultProps = {
  pagination: {
    pageSize: 10,
    position: 'bottom',
  },
  fetchData: {
    query: {},
  },
  tableName: 'Table',
  entityName: 'Row',
  rowSelection: false,
  size: 'default',
  actions: {
    edit: {
      show: true,
    },
    remove: true,
  },
};
DataTable.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
  columns: propTypes.instanceOf(Object).isRequired,
  fetchData: propTypes.shape({
    path: propTypes.string.isRequired,
    query: propTypes.instanceOf(Object),
  }),
  actions: propTypes.shape({
    remove: propTypes.bool,
    edit: propTypes.shape({
      show: propTypes.bool,
      redirectUrl: propTypes.string,
    }),
  }),
  entityName: propTypes.string,
  tableName: propTypes.string,
  pagination: propTypes.shape({
    pageSize: propTypes.number,
    position: propTypes.string,
  }),
  rowSelection: propTypes.oneOfType([propTypes.func, propTypes.bool]),
  size: propTypes.oneOf(['default', 'small', 'middle']),
};

export default withRouter(DataTable);
