/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import PropsTypes from 'prop-types';
import {
  Form, Input, Card, Button, Alert, Spin,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { FormattedMessage, injectIntl } from 'react-intl';
import ForgotModal from '../ResetPassword/ForgotModal';
import server, { getUserToken } from '../../feathers';
import config from '../../configs';

class Login extends Component {
  constructor(props) {
    super(props);
    const token = getUserToken();
    if (token) window.location.replace('/');

    this.state = { error: null, loading: false };
    this.form = React.createRef();
  }

  loadingOnLogging = () => {
    const { loading } = this.state;
    if (loading) {
      return (
        <span style={{ margin: '60% 26%' }}>
          <Spin size="small" />
          {' '}
          <FormattedMessage id="login.loading" defaultMessage="logging..." />
        </span>
      );
    }
    return null;
  }

  validateLogin = (user) => {
    if (user.isBlocked) {
      this.setState({
        error: <FormattedMessage
          id="login.error.blocked"
          defaultMessage="Sorry, but you have been blocked from the system, contact administrator for help"
        />,
      });
      return;
    }
    if (!user.isAdmin) {
      this.setState({
        error: <FormattedMessage
          id="login.error.permissions"
          defaultMessage="You don't have the required permission to login"
        />,
      });
      server.logout();
      return;
    }
    window.location.replace('/');
  }

  // handle login request
  onFinish = (values) => {
    this.setState({ loading: true });
    server.authenticate({
      strategy: 'local',
      email: values.email,
      password: values.password,
    })
      .then((res) => {
        this.validateLogin(res.user);
        this.setState({ loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
        if (error.code === 401) {
          this.setState({
            error: <FormattedMessage
              id="login.error.invalid"
              defaultMessage="Invalid e-mail or password"
            />,
          });
        } else this.setState({ error: error.message });
      });
  }


  render() {
    const { error } = this.state;
    const { intl } = this.props;

    const placeHolders = {
      email: intl.formatMessage({ id: 'login.form.emailPH', defaultMessage: 'E-mail' }),
      password: intl.formatMessage({ id: 'login.form.passwordPH', defaultMessage: 'Password' }),
    };

    return (
      <div className="auth__wrapper">
        <div className="auth__logo">
          <img src={config.APP_LOGO_PATH} alt="LOGO" width="600" height="150" />
          {' '}
        </div>
        <Card
          className="auth_card card-shad"
          title={(
            <>
              <FormattedMessage id="login.title" defaultMessage="Login to your account" />
              {this.loadingOnLogging()}
            </>
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
          <Form ref={this.form} name="loginForm" onFinish={this.onFinish}>
            <Form.Item
              name="email"
              rules={[{
                type: 'email',
                message: <FormattedMessage
                  id="login.email.invalid"
                  defaultMessage="Please input a valid E-mail!"
                />,
              }, {
                required: true,
                message: <FormattedMessage
                  id="login.email.required"
                  defaultMessage="Please input your E-mail!"
                />,
              }]}
            >
              <Input
                size="large"
                onChange={() => this.setState({ error: false })}
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={placeHolders.email}
              />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
              <Input.Password
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                size="large"
                placeholder={placeHolders.password}
                onChange={() => this.setState({ error: false })}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                <FormattedMessage id="login.button" defaultMessage="Login in" />
              </Button>
              <ForgotModal />
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

Login.propTypes = {
  intl: PropsTypes.instanceOf(Object).isRequired,
};

export default injectIntl(Login);
