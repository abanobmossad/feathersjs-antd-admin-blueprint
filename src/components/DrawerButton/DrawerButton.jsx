import React, { Component } from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Drawer, Icon } from 'antd';

class DrawerButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible } = this.state;
    const {
      buttonTitle, buttonProps, title, content, placement, path, history,
    } = this.props;
    return (
      <div>
        <Button
          shape={buttonProps.shape}
          type={buttonProps.type}
          onClick={path ? () => history.push(path) : this.showDrawer}
        >
          <Icon type={buttonProps.icon} />
          {' '}
          {buttonTitle}
        </Button>
        {!path && (
        <Drawer
          title={title}
          width={720}
          onClose={this.onClose}
          visible={visible}
          destroyOnClose
          placement={placement}
        >
          {content(this.onClose)}
        </Drawer>
        )}
      </div>
    );
  }
}

DrawerButton.defaultProps = {
  buttonProps: {
    type: 'primary',
    icon: 'plus',
  },
  buttonTitle: 'NEW ROW',
  title: 'ADD NEW ENTITY',
  placement: 'right',
  path: null,
};

DrawerButton.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
  content: propTypes.func.isRequired,
  buttonTitle: propTypes.oneOfType([propTypes.string, propTypes.element]),
  buttonProps: propTypes.shape({
    icon: propTypes.string,
    type: propTypes.string,
    shape: propTypes.string,
  }),
  placement: propTypes.oneOf(['top', 'bottom', 'left', 'right']),
  path: propTypes.string,
  title: propTypes.oneOfType([propTypes.string, propTypes.element]),
};

export default withRouter(DrawerButton);
