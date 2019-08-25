import React, { Component } from 'react';
import { Descriptions, message, Spin } from 'antd';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import server from '../../feathers';

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: {},
    };
  }

  componentDidMount() {
    const { path, refId } = this.props;
    const { match: { params: { id } } } = this.props;
    server.service(path).get(refId || id).then((data) => {
      this.setState({
        data,
        loading: false,
      });
    }).catch((err) => {
      if (err.code !== 500) {
        message.error(err.message);
      } else if (err.code === 404) {
        message.error('Not found');
      } else {
        message.error('Something went wrong, Please try later');
      }
    });
  }

  renderSchema = () => {
    const { data } = this.state;
    const { schema } = this.props;
    return (
      <Descriptions title={schema.title}>
        {schema.data.map((v) => (
          <Descriptions.Item
            key={v.dataIndex}
            label={v.label}
          >
            {v.render ? v.render(data[v.dataIndex]) : data[v.dataIndex]}
          </Descriptions.Item>
        ))}
      </Descriptions>
    );
  }

  render() {
    const { loading } = this.state;
    if (loading) return <Spin />;
    return this.renderSchema();
  }
}

View.defaultProps = {
  refId: null,
  match: null,
};

View.propTypes = {
  path: propTypes.string.isRequired,
  refId: propTypes.string,
  schema: propTypes.shape({
    title: propTypes.oneOfType([propTypes.string, propTypes.element]).isRequired,
    data: propTypes.arrayOf(propTypes.shape({
      label: propTypes.oneOfType([propTypes.string, propTypes.element]).isRequired,
      dataIndex: propTypes.string.isRequired,
      render: propTypes.func,
    })),
  }).isRequired,
  match: propTypes.instanceOf(Object),
};


export default withRouter(View);
