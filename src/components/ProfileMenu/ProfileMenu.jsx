import React from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined, CaretDownOutlined } from '@ant-design/icons';
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
      <UserOutlined />
      {' '}
      <FormattedMessage id="profileMenu.myAccount" defaultMessage="My Account" />
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2" onClick={() => logout(history)}>
      <LogoutOutlined />
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
      <Avatar style={{ backgroundColor: '#6c5ce7' }}>
        {currentUser.displayName[0].toUpperCase()}
      </Avatar>
      <span style={{ margin: '0 1rem', fontSize: '1.5rem' }}>{currentUser.displayName}</span>
      <CaretDownOutlined />
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
