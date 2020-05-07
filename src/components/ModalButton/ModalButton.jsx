import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Button, Modal } from 'antd';
import isFunction from 'lodash/isFunction';

class ModalButton extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  closeModal = (e) => {
    this.setState({
      visible: false,
    });
  };


  render() {
    const { visible } = this.state;
    const {
      width, bodyStyle, centered, title, buttonText, buttonIcon, buttonType, content,
    } = this.props;

    return (
      <div>
        <Button
          icon={buttonIcon}
          type={buttonType}
          onClick={this.showModal}
        >
          {buttonText}
        </Button>
        <Modal
          visible={visible}
          width={width}
          title={title}
          footer={false}
          destroyOnClose
          centered={centered}
          maskClosable={false}
          onCancel={this.closeModal}
          bodyStyle={bodyStyle}
        >
          {isFunction(content) ? this.renderContent(this.closeModal) : content}
        </Modal>
      </div>
    );
  }
}

ModalButton.defaultProps = {
  width: 400,
  bodyStyle: null,
  centered: true,
  title: false,
  buttonIcon: null,
  buttonType: 'default',
};

ModalButton.propTypes = {
  content: propTypes.oneOfType([propTypes.element, propTypes.string, propTypes.func]).isRequired,
  buttonText: propTypes.string.isRequired,
  buttonIcon: propTypes.string,
  buttonType: propTypes.string,
  title: propTypes.oneOfType([propTypes.bool, propTypes.string, propTypes.element]),
  bodyStyle: propTypes.instanceOf(Object),
  width: propTypes.number,
  centered: propTypes.bool,
};


export default ModalButton;
