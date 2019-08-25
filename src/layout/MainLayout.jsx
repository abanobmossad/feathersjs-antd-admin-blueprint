import React from 'react';
import ProtoTypes from 'prop-types';
import { Layout, BackTop } from 'antd';
import HeaderLayout from './HeaderLayout';
import SiderLayout from './SiderLayout';
import Footer from '../components/Footer';

const { Content } = Layout;

/** Wrapper for Main routes with Navbar and main layout */
const MainLayout = ({ children }) => (
  // Edit the layout by changing here see for more https://ant.design/components/layout/
  <Layout style={{ minHeight: '100vh' }}>
    <HeaderLayout />
    <Layout style={{ marginLeft: 200, marginTop: 64, background: '#F0F2F5' }}>
      <SiderLayout />
      <Content>
        <div style={{ padding: 24, minHeight: 360 }}>
          {children}
          <BackTop />
        </div>
        <Footer />
      </Content>
    </Layout>
  </Layout>
);


MainLayout.propTypes = {
  children: ProtoTypes.oneOfType([
    ProtoTypes.arrayOf(ProtoTypes.node),
    ProtoTypes.node,
  ]).isRequired,
};
// redirect to login if user logout in other tab
export default MainLayout;
