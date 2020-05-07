import React from 'react';
import configs from '../../configs';

const Dashboard = (props) => (
  <div className="dashboard">
    <img src={configs.APP_LOGO_PATH} width="300" height="150" className="dashboard__img" alt="logo" />
    <h3 className="dashboard__h3">
      <b>FeathersJs-Antd admin panel</b>
    </h3>
  </div>
);

export default Dashboard;
