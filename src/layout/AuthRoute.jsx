import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import propTypes from 'prop-types';
import server from '../feathers';

/** protect admin views -- only logged in users allowed */
const AuthRoute = (props) => {
  const { authStatus } = props;

  if (authStatus === 'success') {
    return <Route {...props} />;
  }
  if (authStatus === 'failed') {
    server.logout();
    return <Redirect to="/login" />;
  }
  return <Spin size="large" style={{ margin: '25% 50%' }} />;
};


AuthRoute.propTypes = {
  authStatus: propTypes.string.isRequired,
};

export default connect((state) => ({
  authStatus: state.Auth.authStatus,
}))(AuthRoute);
