import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Menu, Icon,
} from 'antd';
import propTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import config from '../../configs';
import server from '../../feathers';

const logout = (history) => {
  server.logout();
  history.replace('/login');
};

const ProfileMenu = ({ history }) => (
  <Menu
    mode="vertical"
  >
    <Menu.Item key={0}>
      <Link
        to={config.PROFILE_PATH}
        className="profile__org-link"
      >
        <Icon type="idcard" />
        <FormattedMessage id="profileMenu.myAccount" defaultMessage="My Account" />
      </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item onClick={() => logout(history)}>
      <p>
        <Icon type="logout" />
        <FormattedMessage id="profileMenu.logout" defaultMessage="Logout" />
      </p>
    </Menu.Item>
  </Menu>
);

ProfileMenu.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
};
export default withRouter(ProfileMenu);
