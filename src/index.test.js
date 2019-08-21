// eslint-disable-next-line import/no-extraneous-dependencies
import 'meteor-client';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './layout/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
