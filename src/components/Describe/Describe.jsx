import React, { Component } from 'react';
import { Descriptions, Spin } from 'antd';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import isFunction from 'lodash/isFunction';
import get from 'lodash/get';
import server from '../../feathers';
import ErrorMessage from '../ErrorMessage';
import { RenderFalsyValue } from '../Util';

class Describe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: {},
    };
  }

  componentDidMount() {
    const { path, refId, viewData } = this.props;
    if (viewData) {
      this.setState({ data: viewData, loading: false });
      return;
    }
    const { match: { params: { id } } } = this.props;
    server.service(path).get(refId || id).then((data) => {
      this.setState({
        data,
        loading: false,
      });
    }).catch((err) => {
      ErrorMessage(err);
    });
  }

  static getDerivedStateFromProps(props) {
    const { viewData } = props;
    if (viewData) return { data: viewData };
    return null;
  }

    renderItem = (data, v) => {
      if (get(data, v.dataIndex) || v.render) {
        return v.render ? v.render(get(data, v.dataIndex), data) : get(data, v.dataIndex);
      }
      return RenderFalsyValue();
    }

  renderSchema = () => {
    const { data } = this.state;
    const { schema, layout } = this.props;
    return (
      <Descriptions
        layout={layout}
        title={isFunction(schema.title) ? schema.title(data) : schema.title}
      >
        {schema.data.map((v) => (
          <Descriptions.Item
            key={v.dataIndex}
            label={v.label}
          >
            {this.renderItem(data, v)}
          </Descriptions.Item>
        ))}
      </Descriptions>
    );
  }

  render() {
    const { loading } = this.state;
    if (loading) return <Spin size="large" style={{ margin: '38% 50%' }} />;
    return this.renderSchema();
  }
}

Describe.defaultProps = {
  refId: null,
  match: null,
  viewData: null,
  path: null,
  layout: 'horizontal',
};

Describe.propTypes = {
  path: propTypes.string,
  layout: propTypes.string,
  viewData: propTypes.instanceOf(Object),
  refId: propTypes.oneOfType([propTypes.string, propTypes.number]),
  schema: propTypes.shape({
    title: propTypes.oneOfType([propTypes.string, propTypes.element, propTypes.func]),
    data: propTypes.arrayOf(propTypes.shape({
      label: propTypes.oneOfType([propTypes.string, propTypes.element]).isRequired,
      dataIndex: propTypes.string.isRequired,
      render: propTypes.func,
    })),
  }).isRequired,
  match: propTypes.instanceOf(Object),
};


export default withRouter(Describe);
