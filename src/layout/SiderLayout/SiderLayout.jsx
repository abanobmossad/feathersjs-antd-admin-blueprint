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
const SiderLayout = ({ location: { pathname }, userPermissions }) => (
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
        {generateSiderItems(userPermissions)}
        {/* Add more custom menu items here ... */}
      </Menu>
    </div>

  </Layout.Sider>
);

SiderLayout.propTypes = {
  location: protoTypes.instanceOf(Object).isRequired,
  userPermissions: protoTypes.array.isRequired,
};

export default connect((state) => ({
  userPermissions: state.Auth.userPermissions,
}))(withRouter(SiderLayout));
