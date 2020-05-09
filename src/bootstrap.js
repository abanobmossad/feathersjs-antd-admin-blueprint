import { init } from '@sentry/browser';
import events from 'events';

import configs from './configs';

export default function () {
  // initialize sentry integration
  if (process.env.NODE_ENV !== 'development' && configs.SENTRY_KEY) {
    init({
      dsn: configs.SENTRY_KEY,
      integrations: (integrations) => integrations,
    });
  }
  // initialize global eventEmitter to simulate real time data
  window.eventEmitter = new events.EventEmitter();
}
