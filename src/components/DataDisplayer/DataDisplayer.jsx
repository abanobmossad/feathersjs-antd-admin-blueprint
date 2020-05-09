import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import isArray from 'lodash/isArray';
import forIn from 'lodash/forIn';
import isFunction from 'lodash/isFunction';
import flatten from 'lodash/flatten';
import isEmpty from 'lodash/isEmpty';
import {
  Table, message, Card, Radio, Tooltip, Modal,
  List, Button, Alert, Popconfirm, Collapse, notification, Tag,
} from 'antd';
import {
  DeleteOutlined, CaretRightOutlined, NumberOutlined,
  ReloadOutlined, PauseOutlined, CheckOutlined,
} from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import server from '../../feathers';
import PageHeader from '../PageHeader';
import renderListItem from './render-list-item';
import ErrorMessage from '../ErrorMessage';
import { updateArray } from '../../utils/helpers';

class DataDisplayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      totalData: 0,
      loading: true,
      realTimeStatus: 'notification',
      currentView: props.defaultView,
      currentPage: 0,
      selectedKeys: [],
    };
    // browser history for redirect;
    this.history = props.history;
    this.endpoint = props.endpoint;
    this.pagination = {
      defaultCurrent: 0,
      showSizeChanger: true,
      showTotal: (total) => <Tag icon={<NumberOutlined />} color="#2d3436">{total}</Tag>,
      onChange: (page, pageSize) => {
        // get new next paginated data
        this.fetchData(page, pageSize);
        // scroll to the top of the page
        window.scrollTo(0, 266);
      },
      onShowSizeChange: (page, pageSize) => {
        // get new next paginated data
        this.fetchData(page, pageSize);
      },
    };
  }

  componentDidMount() {
    // update the table with new data after creation, update
    this.updateDataEvents();
    this.fetchData();
  }

  updateDataEvents = () => {
    const { allowRealTime } = this.props;

    const updateStatus = (status) => {
      this.setState({ realTimeStatus: status });
      notification.destroy();
    };

    if (!allowRealTime) {
      window.eventEmitter.on(`create-${this.endpoint}`, (data) => {
        this.setState((prevState) => ({
          data: isArray(data)
            ? [...data, ...prevState.data]
            : [data, ...prevState.data],
        }));
      });
    } else {
      server.service(this.endpoint).on('created', (data) => {
        const { realTimeStatus } = this.state;
        if (realTimeStatus === 'enabled') {
          this.setState((prevState) => ({
            data: isArray(data)
              ? [...data, ...prevState.data]
              : [data, ...prevState.data],
          }));
        } else if (realTimeStatus !== 'disabled') {
          notification.destroy();
          notification.open({
            message: <FormattedMessage
              id="dataDisplayer.events.title"
              defaultMessage="New updates in data"
            />,
            description: <FormattedMessage
              id="dataDisplayer.events.description"
              defaultMessage="You can enable real-time events to appear in the table or disable it and reload ↻ it manually"
            />,
            btn: (
              <>
                <Button
                  type="primary"
                  size="small"
                  icon={<CheckOutlined />}
                  style={{ marginRight: '2rem' }}
                  onClick={() => updateStatus('enabled')}
                >
                  Enable
                </Button>
                <Button
                  icon={<PauseOutlined />}
                  type="dashed"
                  size="small"
                  onClick={() => updateStatus('disabled')}
                >
                  Disable
                </Button>
              </>
            ),
            style: {
              width: 300,
              marginLeft: 100,
            },
          });
        }
      });
    }

    window.eventEmitter.on(`update-${this.endpoint}`, (updatedEntity) => {
      this.setState((prevState) => ({
        data: updateArray(prevState.data, updatedEntity.id, updatedEntity),
      }));
    });
  }

  renderSwitchButtons = () => {
    const { currentView, loading } = this.state;
    const { size } = this.props;
    return (
      <>
        <Tooltip title={<FormattedMessage id="dataDisplayer.switchView.tip" defaultMessage="Switch the view" />}>
          <Radio.Group
            size={size}
            value={currentView}
            onChange={(e) => this.setState({ currentView: e.target.value, selectedKeys: [] })}
          >
            <Radio.Button value="table">Table</Radio.Button>
            <Radio.Button value="list">List</Radio.Button>
          </Radio.Group>
        </Tooltip>

        {size !== 'small' && (
        <Tooltip title={<FormattedMessage id="dataDisplayer.reload.tip" defaultMessage="Reload data" />}>
          <Button
            style={{ marginLeft: '1rem' }}
            icon={<ReloadOutlined />}
            size="small"
            type="link"
            loading={loading}
            onClick={() => this.reloadData()}
          />
        </Tooltip>
        )}
      </>
    );
  }

  reloadData = (filters = {}) => {
    const { currentPage } = this.state;
    this.setState({ loading: true });
    this.fetchData(currentPage, 10, filters);
  }

  rowSelectionAction = () => {
    const { multiDelete, entityKey } = this.props;
    if (!multiDelete) return null;
    return {
      onChange: (selectedRowKeys) => {
        this.setState({ selectedKeys: selectedRowKeys });
      },
      getCheckboxProps: (record) => ({
        disabled: isArray(multiDelete) && multiDelete.includes(record[entityKey]),
      }),
    };
  }

  handleDelete = (id, query) => {
    const { entityName } = this.props;
    const { selectedKeys } = this.state;
    const rowName = isEmpty(selectedKeys) ? entityName : `${entityName}s`;
    server.service(this.endpoint).remove(id, { query })
      .then(() => {
        const { currentPage } = this.state;
        this.fetchData(currentPage);
        this.setState({ selectedKeys: [] });
        message.success(`${rowName} deleted successfully `);
      }).catch((err) => {
        ErrorMessage(err);
      });
  }

  handleDeleteMany = () => {
    const { selectedKeys } = this.state;
    const { entityKey } = this.props;
    this.handleDelete(null, { [entityKey]: { $in: selectedKeys } });
  }

  handleFiltersChange = (pagination, filters, sorter) => {
    const queryFilters = {};

    if (!isEmpty(sorter)) {
      queryFilters.$sort = { [sorter.field]: sorter.order === 'ascend' ? 1 : -1 };
    }

    forIn(filters, (value, key) => {
      queryFilters[key] = (isArray(value))
        ? { $in: flatten(value) } : value[0];
    });

    this.setState({ loading: true });

    this.fetchData(pagination.current, pagination.pageSize, queryFilters);
  }

  fetchData(page, pageSize = 10, queryFilters) {
    const { query } = this.props;
    const $sort = { updatedAt: -1 };
    server.service(this.endpoint).find({
      query: {
        $skip: ((page && page - 1) || 0) * pageSize,
        $limit: pageSize,
        $sort,
        ...queryFilters,
        ...query,
      },
    }).then((fetchedData) => {
      this.setState({
        data: fetchedData.data,
        loading: false,
        totalData: fetchedData.total,
        currentPage: page || 1,
      });
    }).catch((err) => {
      ErrorMessage(err);
    });
  }

  renderRemoveAction = (record) => {
    const { removeBtn, entityKey } = this.props;
    const id = record[entityKey];
    const show = isFunction(removeBtn) ? removeBtn(record) : removeBtn;
    if (!show) return null;
    return (
      <Tooltip title="Remove" key={id}>
        <Button
          onClick={() => {
            Modal.confirm({
              title: 'Do you really want to delete this item?',
              okType: 'danger',
              okText: 'Delete',
              content: <span>This item will be deleted permanently</span>,
              onOk: () => { this.handleDelete(id); },
              onCancel() {},
            });
          }}
          type="link"
          shape="circle-outline"
        >
          <DeleteOutlined />
        </Button>
      </Tooltip>
    );
  }

  renderActions = (actions) => {
    try {
      return [...actions];
    } catch (error) {
      return [];
    }
  }

  renderViewAsTable = () => {
    const {
      data, totalData, loading, currentPage,
    } = this.state;
    const {
      size, columns, entityKey, actions,
    } = this.props;

    const columnsWithActions = columns.concat([{
      key: 'control',
      title: 'Control',
      fixed: 'right',
      render: (record) => {
        const acts = actions(record);
        const rmv = this.renderRemoveAction(record);
        if (acts.length === 0 && !rmv) {
          return <Tag>NO ACTIONS</Tag>;
        }
        return [...this.renderActions(acts), rmv];
      },
    }]);

    return (
      <Table
        dataSource={data}
        columns={columnsWithActions}
        loading={loading}
        rowKey={(record) => record[entityKey]}
        size={size}
        rowSelection={this.rowSelectionAction()}
        rowClassName="table__row"
        onChange={this.handleFiltersChange}
        pagination={{
          ...this.pagination,
          current: currentPage,
          total: totalData,
        }}
      />
    );
  }

  renderViewAsList = () => {
    const {
      data, totalData, loading, currentPage,
    } = this.state;
    const {
      size, columns, actions, entityKey,
    } = this.props;

    return (
      <List
        loading={loading}
        itemLayout="vertical"
        dataSource={data}
        size={size}
        pagination={{
          ...this.pagination,
          current: currentPage,
          total: totalData,
        }}
        renderItem={(record) => (
          <List.Item
            key={record[entityKey]}
            actions={[
              ...this.renderActions(actions(record)),
              this.renderRemoveAction(record),
            ]}
          >
            {renderListItem(columns, record)}
          </List.Item>
        )}
      />
    );
  }

  renderFiltersSection = () => {
    const { filtersComponent, filtersTitle, size } = this.props;
    if (filtersComponent && size === 'default') {
      return (
        <Collapse
          style={{ marginBottom: '2rem' }}
          bordered={false}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        >
          <Collapse.Panel
            key="1"
            header={filtersTitle}
          >
            {filtersComponent(this.reloadData)}
          </Collapse.Panel>
        </Collapse>
      );
    }
    return null;
  }

  render() {
    const { currentView, selectedKeys } = this.state;
    const { size, showHeader, pageHeader } = this.props;
    const hasSelected = !isEmpty(selectedKeys);
    return (
      <>
        {/* render pager header id showHeader is true and props found */}
        {showHeader && pageHeader && <PageHeader {...pageHeader} />}
        {/* render filters section */}
        {this.renderFiltersSection()}
        {/* render view (table or list) */}
        <Card
          className="card-shad"
          size={size}
          bordered={size !== 'small'}
          title={hasSelected && (
          <Alert
            style={{ width: '50%' }}
            banner
            type="info"
            message={(
              <>
                <FormattedMessage
                  id="dataDisplayer.deleteMany.number"
                  values={{ itemsNumber: selectedKeys.length }}
                  defaultMessage="Selected {itemNumber}"
                >
                  {(txt) => (
                    <span style={{ marginRight: 8 }}>
                      <b>{txt}</b>
                    </span>
                  )}
                </FormattedMessage>
                <Popconfirm
                  onConfirm={this.handleDeleteMany}
                  title={(
                    <FormattedMessage
                      id="dataDisplayer.deleteMany.title"
                      defaultMessage="Sure you want to delete this rows?"
                    />
                    )}
                >
                  <Button type="link">
                    <b><FormattedMessage id="dataDisplayer.deleteMany" defaultMessage="delete" /></b>
                  </Button>
                </Popconfirm>
              </>
              )}
          />
          )}
          extra={this.renderSwitchButtons()}
        >
          {currentView === 'table' ? this.renderViewAsTable() : this.renderViewAsList()}
        </Card>
      </>
    );
  }
}

DataDisplayer.defaultProps = {
  query: {},
  entityName: 'Row',
  filtersComponent: null,
  defaultView: 'table',
  multiDelete: false,
  allowRealTime: false,
  size: 'default',
  entityKey: 'id',
  filtersTitle: 'Filters',
  actions: () => {},
  removeBtn: true,
  showHeader: true,
  pageHeader: {},
};

DataDisplayer.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
  columns: propTypes.instanceOf(Object).isRequired,
  endpoint: propTypes.string.isRequired,
  query: propTypes.instanceOf(Object),
  entityName: propTypes.string,
  entityKey: propTypes.string,
  defaultView: propTypes.string,
  allowRealTime: propTypes.bool,
  filtersComponent: propTypes.func,
  filtersTitle: propTypes.oneOfType([propTypes.string, propTypes.element]),
  multiDelete: propTypes.bool,
  size: propTypes.oneOf(['default', 'small', 'middle']),
  actions: propTypes.func,
  removeBtn: propTypes.oneOfType([
    propTypes.bool, propTypes.func,
    propTypes.string, propTypes.element,
  ]),
  showHeader: propTypes.bool,
  pageHeader: propTypes.instanceOf(Object),
};

export default withRouter(DataDisplayer);
