import React from 'react';
import protoTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {
  Layout, Menu, Icon,
} from 'antd';
import { FormattedMessage } from 'react-intl';

const colors = require('../../configs/colors');

/** The app side bar */
const SiderLayout = ({ location: { pathname }, history }) => (
  <Layout.Sider
    style={{ background: colors['sider-background'] }}
    className="layout__sider"
  >
    <Menu
      defaultSelectedKeys={[pathname]}
      mode="inline"
      style={{ background: colors['sider-background'] }}
    >
      <Menu.Item key="/">
        <Link className="layout__link" to="/">
          <Icon type="dashboard" />
          <FormattedMessage id="sideBar.dashboard" defaultMessage="Dashboard" />
        </Link>
      </Menu.Item>

      <Menu.Item key="/test">
        <Link className="layout__link" to="/test">
          <Icon type="dashboard" />
          <FormattedMessage id="sideBar.test" defaultMessage="test" />
        </Link>
      </Menu.Item>

      {/* Add more custom menu items here ... */}
    </Menu>

  </Layout.Sider>
);

SiderLayout.propTypes = {
  location: protoTypes.instanceOf(Object).isRequired,
  history: protoTypes.instanceOf(Object).isRequired,
};

export default withRouter(SiderLayout);
