import React, { Component } from 'react';
import { Select, message } from 'antd';
import propTypes from 'prop-types';
import server from '../../feathers';
import renderTemp from './data-template';
import defaultQry from './default-query';

class SelectEntity extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    // load the value if found
    // eslint-disable-next-line react/prop-types
    const { value, initQry } = this.props;
    this.getData(initQry);
    this.getRef(value);
  }

  // eslint-disable-next-line react/prop-types
  componentWillReceiveProps({ initQry }) {
    this.getData(initQry);
  }

  getRef = (value) => {
    const { refName } = this.props;
    const { data } = this.state;
    if (value) {
      const existingValue = data.filter((v) => v.id === value);
      if (existingValue.length !== 0) return;
      server.service(refName).get(value).then((res) => {
        this.setState((prev) => ({ data: [...prev.data, res] }));
      }).catch((err) => {
        message.error('Something went wrong getting relations, This maybe because some data has been deleted', 2);
      });
    }
  }

  getData = (qry) => {
    const { refName } = this.props;
    server.service(refName).find({
      query: {
        ...qry,
        $limit: 30,
      },
    }).then((res) => {
      this.setState({ data: res.data });
    }).catch((err) => {
      message.error('Something went wrong');
    });
  }

  searchRefs = (keyword) => {
    if (!keyword) return;
    const {
      refName, qry, qryFor, initQry,
    } = this.props;
    if (this.searchTiming) clearTimeout(this.searchTiming);
    const queryFunc = qry || defaultQry(qryFor || refName);
    const query = queryFunc(keyword);
    this.searchTiming = setTimeout(() => { this.getData({ ...query, ...initQry }); }, 1000);
  }

  render() {
    const { data } = this.state;
    const { width, refName } = this.props;
    return (
      <Select
        showSearch
        style={{ width }}
        allowClear
        showArrow={false}
        filterOption={false}
        onSearch={this.searchRefs}
        {...this.props}
      >
        {renderTemp(data, refName)}
      </Select>
    );
  }
}

SelectEntity.defaultProps = {
  width: '100%',
  qry: null,
  qryFor: null,
  initQry: null,
};

SelectEntity.propTypes = {
  refName: propTypes.string.isRequired,
  qry: propTypes.func,
  qryFor: propTypes.string,
  initQry: propTypes.instanceOf(Object),
  width: propTypes.oneOfType([propTypes.number, propTypes.string]),
};

export default SelectEntity;
