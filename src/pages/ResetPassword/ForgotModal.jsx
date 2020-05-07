import React, { Component } from 'react';
import {
  Input, Button, Modal, message,
} from 'antd';
import Icon from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import server from '../../feathers';


class ForgotModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      error: null,
      email: null,
      sending: false,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  sendResetLink = () => {
    const { email } = this.state;
    if (!email) return;
    this.setState({ sending: true });
    server.service('authManagement').create({
      action: 'sendResetPwd',
      value: { email },
    }).then(() => {
      this.handleCancel();
      message.success('An e-mail had been sent to your inbox with reset instructions', 5);
    }).catch((err) => {
      this.setState({
        error: 'Sorry, but no account associated with this email',
        sending: false,
      });
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      email: null,
      error: null,
      sending: false,
    });
  };

  render() {
    const {
      visible, email, error, sending,
    } = this.state;
    return (
      <div>
        <Button type="link" onClick={this.showModal}>
          <FormattedMessage id="login.forgotPass" defaultMessage="Forgot password ?" />
        </Button>
        <Modal
          title={(
            <>
              <Icon name="question-circle" />
              {' '}
              <FormattedMessage id="resetPassword.forgotPass" defaultMessage="Forgot password" />
            </>
          )}
          visible={visible}
          onOk={this.sendResetLink}
          okButtonProps={{
            loading: sending,
          }}
          okText="Send"
          onCancel={this.handleCancel}
        >
          <p>Enter your account e-mail to send the reset link</p>
          <Input
            type="email"
            value={email}
            size="large"
            disabled={sending}
            prefix={<Icon name="envelope" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="myemail@example.com"
            onChange={(e) => { this.setState({ email: e.target.value, error: null }); }}
          />
          {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
        </Modal>
      </div>
    );
  }
}
export default ForgotModal;
