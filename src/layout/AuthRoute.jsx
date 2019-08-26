import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import isEmpty from 'lodash/isEmpty';
import propTypes from 'prop-types';
import { authenticateUser } from '../ReduxStore/actions/authActions';


/** protect admin views -- only logged in users allowed */
class AuthRoute extends React.Component {
  componentDidMount() {
    const { authUser, authStatus } = this.props;
    if (authStatus !== 'success') authUser();
  }

  permitted = () => {
    const { allowedPermissions, userPermissions } = this.props;
    if (isEmpty(allowedPermissions)) return true;
    if (userPermissions.some((p) => allowedPermissions.includes(p))) {
      return true;
    }
    return false;
  }

  render() {
    const { authStatus } = this.props;
    if (authStatus === 'success') {
      if (this.permitted()) return <Route {...this.props} />;
      return <Redirect to="/404" />;
    }
    if (authStatus === 'failed') return <Redirect to="/login" />;
    return <Spin size="large" style={{ margin: '45% 50%' }} />;
  }
}
AuthRoute.defaultProps = {
  allowedPermissions: [],
};

AuthRoute.propTypes = {
  authStatus: propTypes.string.isRequired,
  allowedPermissions: propTypes.array,
  userPermissions: propTypes.array.isRequired,
  authUser: propTypes.func.isRequired,
};

export default connect((state) => ({
  authStatus: state.Auth.authStatus,
  userPermissions: state.Auth.userPermissions,
}), {
  authUser: authenticateUser,
})(AuthRoute);
