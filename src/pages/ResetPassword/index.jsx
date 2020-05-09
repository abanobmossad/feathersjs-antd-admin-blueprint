import React, { Component } from 'react';
import {
  Input, Card, Alert, Button, message, Form,
} from 'antd';
import propsTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { LockOutlined } from '@ant-design/icons';
import server, { getUserToken } from '../../feathers';
import config from '../../configs';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = { resetting: false, error: null };
  }

  componentDidMount() {
    const { history, match: { params: { token } } } = this.props;
    const accessToken = getUserToken();
    if (accessToken || token.length !== 30) history.replace('/');
    this.form = React.createRef();
  }

  resetPass = (data) => {
    const { match: { params: { token } } } = this.props;
    if (data.password !== data.cPassword) {
      this.setState({ error: 'Password not match' });
      return;
    }
    this.setState({ resetting: true });
    server.service('authManagement').create({
      action: 'resetPwdLong',
      value: { token, password: data.password },
    }).then(() => {
      message.success('Password reset successfully, try to login', 5);
      window.location.replace('/login');
    }).catch((error) => {
      this.setState({ error: error.message, resetting: false });
    });
  }

  render() {
    const { error, resetting } = this.state;
    return (
      <div className="auth__wrapper">
        <div className="auth__logo">
          <img src={config.APP_LOGO_PATH} alt="LOGO" width="600" height="150" />
          {' '}
        </div>

        <Card
          title="Reset password"
          className="auth_card card-shad"
          extra={(
            <Button type="link" onClick={() => window.location.replace('/login')}>
              Login ?
            </Button>
              )}
        >
          {error && (
          <Alert
            description={error}
            style={{ marginBottom: '1rem' }}
            type="error"
            banner
          />
          )}

          <Form name="resetPasswordForm" ref={this.form} onFinish={this.resetPass}>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]} label="Enter new password">
              <Input.Password
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                size="large"
                onChange={() => this.setState({ error: false })}
              />
            </Form.Item>
            <Form.Item new="cPassword" rules={[{ required: true, message: 'Please confirm your Password!' }]} label="Confirm password">
              <Input.Password
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                size="large"
                onChange={() => this.setState({ error: false })}
              />
            </Form.Item>
            <Button
              loading={resetting}
              style={{ marginTop: '1rem' }}
              block
              type="primary"
              htmlType="submit"
            >
              Reset password
            </Button>
          </Form>
          <p style={{ marginTop: '1rem', fontSize: 12, color: 'gray' }}>
            If you facing any problem, Please retch out one of the administrators
          </p>
        </Card>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  history: propsTypes.instanceOf(Object).isRequired,
  match: propsTypes.instanceOf(Object).isRequired,
};

export default withRouter(ResetPassword);
