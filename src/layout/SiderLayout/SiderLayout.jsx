import React from 'react';
import protoTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Layout, Menu,
} from 'antd';
import { connect } from 'react-redux';
import { generateSiderItems } from '../../utils/generate-pages';

const colors = require('../../configs/colors');

/** The app side bar */
const SiderLayout = ({ location: { pathname }, user }) => (
  <Layout.Sider
    style={{ background: colors['sider-background'] }}
    className="layout__sider"
    width={230}
    collapsible
  >
    {/* make the side bar scrollable and hide the scrollbar */}
    <div className="layout__sider-scroller">
      <Menu
        defaultSelectedKeys={[pathname]}
        mode="inline"
        style={{
          background: colors['sider-background'],
          borderRight: 0,
          paddingBottom: '10rem',
        }}
      >
        {generateSiderItems(user)}
        {/* Add more custom menu items here ... */}
      </Menu>
    </div>

  </Layout.Sider>
);

SiderLayout.propTypes = {
  location: protoTypes.instanceOf(Object).isRequired,
  user: protoTypes.instanceOf(Object).isRequired,
};

export default connect((state) => ({
  user: state.Auth.user,
}))(withRouter(SiderLayout));
