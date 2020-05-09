import React, { Component } from 'react';
import {
  Avatar, Button, message,
} from 'antd';
import propTypes from 'prop-types';
import { UploadOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { viewFile } from '../../utils/helpers';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: null,
    };
  }


  beforeUpload = (file) => {
    const { onFileChange } = this.props;
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
      return;
    }
    getBase64(file, (imageUrl) => this.setState({
      imageUrl,
    }));
    onFileChange(file);
  }

  handleFileChange = (e) => {
    const file = e.currentTarget.files[0];
    this.beforeUpload(file);
  }


  render() {
    const { fileUri, style } = this.props;
    const { imageUrl } = this.state;

    return (
      <div className="fileUpload__wrapper" style={style}>
        <Avatar shape="square" src={imageUrl || (fileUri && viewFile(fileUri))} icon="picture" alt="File" size={135} />
        <div className="fileUpload__upload-btn-wrapper">
          <Button style={{ width: '13.5rem' }}>
            <UploadOutlined />
            {' '}
            <FormattedMessage id="fileUpload.uploadBtn" defaultMessage="Upload" />
          </Button>
          <input type="file" size="20" onChange={this.handleFileChange} />
        </div>
      </div>
    );
  }
}

FileUpload.defaultProps = {
  fileUri: null,
  style: null,
};

FileUpload.propTypes = {
  fileUri: propTypes.string,
  onFileChange: propTypes.func.isRequired,
  style: propTypes.instanceOf(Object),
};

export default FileUpload;
