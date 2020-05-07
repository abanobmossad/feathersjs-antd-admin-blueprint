import React, { useState, useEffect } from 'react';
import ProtoTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Layout, BackTop, Spin } from 'antd';
import HeaderLayout from './HeaderLayout';
import SiderLayout from './SiderLayout';
import Footer from '../components/Footer';
import server from '../feathers';
import { authenticateUser } from '../ReduxStore/actions/authActions';
import config from '../configs';

const { Content } = Layout;

/** Wrapper for Main routes with Navbar and main layout */
const renderLayout = (children) => (
  // Edit the layout by changing here see for more https://ant.design/components/layout/
  <Layout style={{ minHeight: '100vh' }}>
    <HeaderLayout />
    <Layout hasSider style={{ marginTop: 64, background: '#F0F2F5' }}>
      <SiderLayout />
      <Content style={{ padding: 24, minHeight: 360 }}>
        {children}
        <BackTop />
        <Footer />
      </Content>
    </Layout>
  </Layout>
);

const renderSplashScreen = () => (
  <div
    className="auth__wrapper flex"
    style={{ flexDirection: 'row' }}
  >
    <img src={config.APP_LOGO_PATH} alt="Logo" width="100" height="100" />
    <p style={{ fontSize: '6rem', margin: '0 2rem' }}>{config.APP_NAME}</p>
    <Spin size="large" />
  </div>
);

// eslint-disable-next-line arrow-body-style
const MainLayout = ({ children, dispatchAuthUser, authStatus }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (authStatus !== 'success') {
      dispatchAuthUser();
    }
  });
  // wait 2 sec for splash screen
  setTimeout(() => { setLoading(true); }, 1500);

  if (loading) {
    if (authStatus === 'success') {
      return renderLayout(children);
    } if (authStatus === 'failed') {
      server.logout();
      return <Redirect to="/login" />;
    }
  }
  return renderSplashScreen();
};


MainLayout.propTypes = {
  children: ProtoTypes.oneOfType([
    ProtoTypes.arrayOf(ProtoTypes.node),
    ProtoTypes.node,
  ]).isRequired,
  dispatchAuthUser: ProtoTypes.func.isRequired,
  authStatus: ProtoTypes.string.isRequired,
};

export default connect((state) => ({
  authStatus: state.Auth.authStatus,
}), {
  dispatchAuthUser: authenticateUser,
})(MainLayout);
