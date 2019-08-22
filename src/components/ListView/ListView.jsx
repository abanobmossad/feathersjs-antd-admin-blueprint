import React from 'react';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  message, Button, Icon, List, Popconfirm,
} from 'antd';
import isBoolean from 'lodash/isBoolean';
import server from '../../feathers';

class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      totalData: 0,
    };
    // browser history for redirect;
    this.history = props.history;
  }

  componentDidMount() {
    this.fetchData();
  }

  renderEditButton = (id) => {
    const { actions, fetchData: { path }, entityName } = this.props;
    if (actions.edit.show) {
      if (actions.edit.redirectUrl) {
        return (
          <Button
            type="link"
            shape="circle-outline"
            icon="edit"
            style={{ border: 'none' }}
            title={`Edit ${entityName}`}
            onClick={() => this.history.push(actions.edit.redirectUrl(id))}
          />
        );
      }
      if (actions.edit.element) return actions.edit.element(id);
      return (
        <Button
          type="link"
          shape="circle-outline"
          icon="edit"
          title={`Edit ${entityName}`}
          onClick={() => this.history.push(`/${path}/edit/${id}`)}
        />
      );
    }
    return undefined;
  };

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

  loadAsGrid = (grid) => {
    if (isBoolean(grid)) {
      if (grid === true) {
        return { gutter: 16, column: 3 };
      }
      return undefined;
    }
    return grid;
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
        totalData: fetchedData.total,
        loading: false,
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
      data, loading, totalData, currentPage,
    } = this.state;
    const {
      size, listMeta, listContent, extra, grid,
      actions, entityName, itemLayout, pagination,
    } = this.props;
    return (
      <List
        loading={loading}
        // itemLayout="vertical"
        dataSource={data}
        itemLayout={itemLayout}
        size={size}
        grid={this.loadAsGrid(grid)}
        pagination={{
          hideOnSinglePage: true,
          current: currentPage,
          position: pagination.position,
          total: totalData,
          defaultCurrent: 0,
          pageSize: pagination.pageSize,
          onChange: (page) => {
            // get new next paginated data
            this.fetchData(page);
          },
        }}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              this.renderEditButton(item._id),
              actions.remove && (
              <Popconfirm
                icon={<Icon type="delete" />}
                title={(
                  <FormattedMessage
                    id="listView.pop.delete"
                    defaultMessage={`Sure to delete this ${entityName} ?`}
                    values={{ entityName }}
                  />
                    )}
                onConfirm={() => this.handleDelete(item._id)}
              >
                <Button
                  type="link"
                  shape="circle-outline"
                  icon="delete"
                  title={`Remove ${entityName}`}
                />
              </Popconfirm>
              ),
            ]}
            extra={extra}
          >
            <List.Item.Meta
              {...listMeta(item)}
            />
            {listContent && listContent(item)}
          </List.Item>
        )}
      />
    );
  }
}

ListView.defaultProps = {
  fetchData: {
    query: {},
  },
  pagination: {
    pageSize: 10,
    position: 'bottom',
  },
  entityName: 'Row',
  size: 'default',
  actions: {
    edit: {
      show: true,
    },
    remove: true,
  },
  listContent: undefined,
  extra: undefined,
  itemLayout: 'vertical',
  grid: false,
};
ListView.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
  listMeta: propTypes.func.isRequired,
  fetchData: propTypes.shape({
    path: propTypes.string.isRequired,
    query: propTypes.instanceOf(Object),
  }),
  actions: propTypes.shape({
    remove: propTypes.bool,
    edit: propTypes.shape({
      show: propTypes.bool,
      redirectUrl: propTypes.func,
      element: propTypes.func,
    }),
  }),
  pagination: propTypes.shape({
    pageSize: propTypes.number,
    position: propTypes.string,
  }),
  entityName: propTypes.string,
  size: propTypes.oneOf(['default', 'small', 'large']),
  itemLayout: propTypes.oneOf(['vertical', 'horizontal']),
  listContent: propTypes.func,
  extra: propTypes.element,
  grid: propTypes.oneOfType([propTypes.instanceOf(Object), propTypes.bool]),
};

export default withRouter(ListView);
