/* eslint-disable camelcase */
import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
// languages support
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import ar_EG from 'antd/es/locale/ar_EG';
import en_US from 'antd/es/locale/en_US';
import moment from 'moment';
import MainLayout from '../MainLayout';
import AuthRoute from '../AuthRoute';
import Error500 from '../../pages/Error500';
import TableEx from '../../examples/TableEx';
// import for all routing components

// change app language
const langConfig = {
  intl: navigator.language,
  antd: {
    en_US,
    ar_EG,
  }[navigator.language],
};
moment.locale(langConfig.intl);

const App = () => (
  <IntlProvider locale={langConfig.intl} messages={{}} defaultLocale="en">
    {/* antd provider for components languages support */}
    <ConfigProvider locale={langConfig.antd}>
      <BrowserRouter>
        <Switch>
          {/* authentication routes  (without navbar and footer) */}
          <Route exact path="/enroll/:token" />
          <Route exact path="/404" />
          {/* Routes for the main layout (with navbar and footer) */}
          <MainLayout>
            <Switch>
              <Route exact path="/test" component={TableEx} />

              {/* Error pages */}
              <Route exact path="/500" component={Error500} />
              <Route exact path="/" />
              <Redirect exact from="*" to="/404" />
            </Switch>
          </MainLayout>
        </Switch>
      </BrowserRouter>
    </ConfigProvider>
  </IntlProvider>
);

export default App;
