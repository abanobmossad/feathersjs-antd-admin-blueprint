import React, { Component } from 'react';
import {
  Form, Input, Button, message,
} from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import propTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ErrorMessage from '../ErrorMessage';
import uploadFile from '../FileUpload/upload-file';
import FileUpload from '../FileUpload';
import server from '../../feathers';

class AccountForm extends Component {
  constructor(props) {
    super(props);
    const [form] = Form.useForm();
    this.form = form;
  }

  componentDidMount() {
    server.service('users').get('me').then((user) => {
      const fields = {
        fullName: user.fullName,
      };
      this.form.setFieldsValue(fields);
      this.setState({ avatarUri: user.avatar && user.avatar });
    }).catch((err) => {
      ErrorMessage(err);
    });
  }

  handleSubmit = (e) => {
    const { onUpdate, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, data) => {
      if (!err) {
        server.service('users').patch('me', data).then((user) => {
          message.success('Profile updated successfully');
          if (onUpdate) onUpdate(user);
          // start upload logo if added
          const { avatarFile } = this.state;
          uploadFile(avatarFile, 'avatar');
        }).catch((error) => {
          ErrorMessage(error);
        });
      }
    });
  }

  render() {
    const { avatarUri } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="flex row">
          <Form.Item
            name="name"
            label={(
              <FormattedMessage
                id="accountProfile.data.name"
                defaultMessage="Full name"
              />
              )}
          >
            <Input
              disabled
              prefix={<ProfileOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
            ,
          </Form.Item>
          {/* Logo upload */}
          <FileUpload
            onFileChange={(avatarFile) => this.setState({ avatarFile })}
            fileUri={avatarUri}
          />
        </div>
        {/* submit form */}
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            <FormattedMessage id="accountProfile.data.save" defaultMessage="Save" />
          </Button>
        </Form.Item>
      </Form>
    );
  }
}


AccountForm.propTypes = {
  form: propTypes.instanceOf(Object).isRequired,
  onUpdate: propTypes.func.isRequired,
};


const WrappedForm = Form.create({ name: 'profile_form' })(AccountForm);

export default WrappedForm;
