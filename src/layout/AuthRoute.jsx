import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CookieStorage } from 'cookie-storage';
import server from '../feathers';

const cookieStorage = new CookieStorage();

/** protect admin views -- only logged in users allowed */
class AuthRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth = (props) => {
    server.authenticate()
      .then((res) => server.service('users').get('me'))
      .then((user) => {
        this.setState({ isAuthenticated: true, loading: false });
      })
      .catch((err) => {
        cookieStorage.clear();
        this.setState({ isAuthenticated: false, loading: false });
      });
  }

  render() {
    const { loading, isAuthenticated } = this.state;
    if (isAuthenticated && !loading) return <Route {...this.props} />;
    return !loading && <Redirect to="/login" />;
  }
}

export default AuthRoute;
