import React, { Component } from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Button, Drawer, Tooltip, Typography,
} from 'antd';
import { MoreOutlined, FullscreenOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

class DrawerButton extends Component {
  constructor(props) {
    super(props);
    const { width } = this.props;
    this.state = { visible: false, width, isResizing: false };
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.resizing, false);
    window.addEventListener('mouseup', this.stopResizing, false);
    window.addEventListener('mouseleave', this.stopResizing, false);
  }

  showDrawer = () => { this.setState({ visible: true }); };

  onClose = () => { this.setState({ visible: false }); };

  resizing = (e) => {
    const { clientX } = e;
    const stopResizingWidth = 500;
    const { isResizing } = this.state;
    if (isResizing) {
      const calcWidth = window.innerWidth - (clientX);
      if (calcWidth > stopResizingWidth) this.setState({ width: Math.ceil(calcWidth) });
    }
  }

  startResizing = () => {
    this.setState({ isResizing: true });
  }

  stopResizing = (e) => {
    this.setState({ isResizing: false });
  }

  render() {
    const { visible } = this.state;
    const {
      buttonTitle, buttonProps, title, content,
      placement, path, history, style, resizable,
    } = this.props;
    const { width } = this.state;

    const ButtonIcon = buttonProps.icon;

    return (
      <>
        <Button
          shape={buttonProps.shape}
          type={buttonProps.type}
          onClick={this.showDrawer}
          style={style}
        >
          <ButtonIcon />
          {' '}
          {buttonTitle && buttonTitle}
        </Button>
        <Drawer
          title={(
            <div className="flex row" style={{ marginTop: 2 }}>
              <Typography.Title level={4}>{title && title}</Typography.Title>
              {path && (
                <Tooltip placement="right" title={<FormattedMessage id="Drawer.open.tip" defaultMessage="Open on new window" />}>
                  <Button type="link" onClick={() => history.push(path)}>
                    <FullscreenOutlined style={{ fontSize: 16 }} />
                  </Button>
                </Tooltip>
              )}
            </div>
          )}
          width={width}
          onClose={this.onClose}
          visible={visible}
          destroyOnClose
          placement={placement}
        >
          {/* render resizing `like` button */}
          {/* Show the resizer only if it is View drawer */}
          {resizable && (
          <div className="resizable-drawer">
            <MoreOutlined onMouseDown={this.startResizing} style={{ fontSize: 35 }} />
          </div>
          )}
          {/* load content */}
          {content(this.onClose)}
        </Drawer>
      </>
    );
  }
}

DrawerButton.defaultProps = {
  buttonProps: {
    type: 'primary',
    icon: 'plus',
  },
  buttonTitle: 'NEW ROW',
  title: false,
  placement: 'right',
  path: null,
  width: 720,
  style: null,
  resizable: false,
};

DrawerButton.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
  content: propTypes.func.isRequired,
  buttonTitle: propTypes.oneOfType([propTypes.bool, propTypes.string, propTypes.element]),
  buttonProps: propTypes.shape({
    icon: propTypes.string,
    type: propTypes.string,
    shape: propTypes.string,
  }),
  placement: propTypes.oneOf(['top', 'bottom', 'left', 'right']),
  path: propTypes.string,
  title: propTypes.oneOfType([propTypes.string, propTypes.element, propTypes.bool]),
  width: propTypes.number,
  resizable: propTypes.bool,
  style: propTypes.instanceOf(Object),
};


export default withRouter(DrawerButton);
