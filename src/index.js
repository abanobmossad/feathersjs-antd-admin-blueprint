import React from 'react';
import { render } from 'react-dom';
import { init } from '@sentry/browser';
import ErrorBoundary from './components/ErrorBoundary';
import * as serviceWorker from './serviceWorker';
import App from './layout/App';
import configs from './configs';

// initialize sentry integration
if (process.env.NODE_ENV !== 'development' && configs.SENTRY_KEY) {
  init({
    dsn: configs.SENTRY_KEY,
    integrations: (integrations) => integrations,
  });
}

render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
