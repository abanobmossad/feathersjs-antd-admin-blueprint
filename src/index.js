import React from 'react';
import { render } from 'react-dom';
import { init } from '@sentry/browser';
import ErrorBoundary from './components/ErrorBoundary';
import * as serviceWorker from './serviceWorker';
import App from './layout/App';

// initialize sentry integration
if (process.env.NODE_ENV !== 'development') {
  init({
    dsn: 'https://8da5aa81f65f4fa381cab36486c0cedf@sentry.io/1329946',
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
