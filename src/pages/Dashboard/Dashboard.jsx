import React from 'react';
import { DashboardTwoTone } from '@ant-design/icons';
import configs from '../../configs';

const Dashboard = () => (
  <div className="dashboard">
    <img src={configs.APP_LOGO_PATH} className="dashboard__img" alt="logo" />
    <h3 className="dashboard__h3">
      <b>FeathersJs-Antd admin panel</b>
    </h3>
  </div>
);

Dashboard.pageSpecs = {
  path: '/',
  title: 'Dashboard',
  icon: <DashboardTwoTone twoToneColor="#eb2f96" />,
};

export default Dashboard;
