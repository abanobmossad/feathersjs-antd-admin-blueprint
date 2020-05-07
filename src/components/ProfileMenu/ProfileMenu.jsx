import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Menu, Dropdown, Avatar,
} from 'antd';
import Icon from 'react-fontawesome';
import propTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import server from '../../feathers';

const logout = (history) => {
  server.logout();
  history.replace('/login');
};

const renderMenu = (history) => (
  <Menu mode="vertical" style={{ width: 140 }}>
    <Menu.Item key="1" onClick={() => history.push('/profile')}>
      <Icon name="user" />
      {' '}
      <FormattedMessage id="profileMenu.myAccount" defaultMessage="My Account" />
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2" onClick={() => logout(history)}>
      <Icon name="sign-out" />
      {' '}
      <FormattedMessage id="profileMenu.logout" defaultMessage="Logout" />
    </Menu.Item>

  </Menu>
);

const ProfileMenu = ({ history, currentUser, className }) => (
  <Dropdown
    placement="bottomRight"
    overlay={renderMenu(history)}
    trigger={['click']}
  >
    <div className={className} style={{ cursor: 'pointer' }}>
      <Avatar style={{ marginRight: '1rem', backgroundColor: '#d35400' }}>
        {currentUser.fullName[0].toUpperCase()}
      </Avatar>
      <Icon name="caret-down" />
    </div>
  </Dropdown>
);

ProfileMenu.defaultProps = {
  className: null,
};


ProfileMenu.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
  currentUser: propTypes.instanceOf(Object).isRequired,
  className: propTypes.string,
};


export default connect((state) => ({ currentUser: state.Auth.user }))(withRouter(ProfileMenu));
