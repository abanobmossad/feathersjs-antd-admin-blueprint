import React, { Component } from 'react';
import { captureException, withScope } from '@sentry/browser';
import Error500 from '../pages/Error500';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });
      captureException(error);
    });
  }

  render() {
    const { error } = this.state;
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;
    if (error) {
      // render fallback UI
      return <Error500 crash />;
    }
    // when there's not an error, render children untouched
    return children;
  }
}
export default ErrorBoundary;
