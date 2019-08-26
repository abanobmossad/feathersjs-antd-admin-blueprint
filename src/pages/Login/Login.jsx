/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropsTypes from 'prop-types';
import {
  Form, Input, Icon, Card, Button, Alert,
} from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import server from '../../feathers';
import config from '../../configs';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
}


class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { error: '' };
  }

  // handle login request
  handleSubmit(e) {
    e.preventDefault();
    const { history, form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        // eslint-disable-next-line react/prop-types
        server.authenticate({
          strategy: 'local',
          email: values.email,
          password: values.password,
        }).then((response) => server.passport.verifyJWT(response.accessToken))
          .then((payload) => server.service('users').get(payload.userId))
          .then((user) => {
            server.set('user', user.id);
            history.replace('/');
          })
          .catch((error) => {
            if (error.code === 401) {
              this.setState({
                error: <FormattedMessage
                  id="login.error"
                  defaultMessage="Invalid e-mail or password"
                />,
              });
            } else this.setState({ error: error.message });
          });
      }
    });
  }

  render() {
    const { error } = this.state;
    const { intl, form: { getFieldDecorator, getFieldsError } } = this.props;

    const placeHolders = {
      email: intl.formatMessage({ id: 'login.form.emailPH', defaultMessage: 'E-mail' }),
      password: intl.formatMessage({ id: 'login.form.passwordPH', defaultMessage: 'Password' }),
    };

    return (
      <div className="auth__wrapper">
        <Card className="auth__logo">
          <img src={config.APP_LOGO_PATH} alt="LOGO" width="52" height="52" />
          {' '}
          <FormattedMessage id="appName" defaultMessage={config.APP_NAME} />
        </Card>
        <Card className="auth_card" title={<FormattedMessage id="login.title" defaultMessage="Login" />}>
          {error && (
          <Alert
            description={error}
            style={{ marginBottom: '1rem' }}
            type="error"
            banner
          />
          )}
          <Form onSubmit={this.handleSubmit}>
            <Form.Item hasFeedback>
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email',
                  message: <FormattedMessage id="login.email.invalid" defaultMessage="Please input a valid E-mail!" />,
                }, {
                  required: true,
                  message: <FormattedMessage id="login.email.required" defaultMessage="Please input your E-mail!" />,
                }],
              })(
                <Input
                  onChange={() => this.setState({ error: false })}
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder={placeHolders.email}
                />,
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input.Password
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder={placeHolders.password}
                  onChange={() => this.setState({ error: false })}
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block disabled={hasErrors(getFieldsError())}>
                <FormattedMessage id="login.button" defaultMessage="Login in" />
              </Button>
              <Button type="link" href="">
                <FormattedMessage id="login.forgotPass" defaultMessage="Forgot password ?" />
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}


Login.propTypes = {
  history: PropsTypes.instanceOf(Object).isRequired,
  intl: PropsTypes.instanceOf(Object).isRequired,
  form: PropsTypes.instanceOf(Object).isRequired,
};

const WrappedNormalLoginForm = Form.create({ name: 'login' })(injectIntl(Login));

export default withRouter(WrappedNormalLoginForm);
