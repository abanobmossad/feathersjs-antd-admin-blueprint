import React from 'react';
import {
  Layout, Menu, Icon,
} from 'antd';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import ProfileMenu from '../../components/ProfileMenu';
import UserAvatar from '../../components/UserAvatar';
import config from '../../configs';

const colors = require('../../configs/colors');

/** The app navbar */
const HeaderLayout = () => (
  <Layout.Header
    style={{ background: colors['header-background'] }}
    className="layout__header"
  >
    {/* logo */}
    {/* EDIT Logo style in the css file and here */}
    <div className="layout__logo">
      <Link to="/">
        <img src={config.APP_LOGO_PATH} alt="LOGO" width="52" height="52" />
        <FormattedMessage id="appName" defaultMessage={config.APP_NAME} />
      </Link>
    </div>

    {/* Add more header items here ...  */}

    {/* profile menu */}
    <Menu
      className="layout__header__profile-menu"
      mode="horizontal"
      style={{ lineHeight: '64px', borderBottomColor: colors['header-background'] }}
    >
      {/* profile */}
      <Menu.SubMenu
        className="layout__header__item"
        key="profile"
        title={(
          <>
            <UserAvatar user={{ firstName: 'abanob', lastName: 'mossad' }} showIdentifier />
            <Icon type="caret-down" />
          </>
          )}
      >
        <ProfileMenu />
      </Menu.SubMenu>
    </Menu>
  </Layout.Header>
);


export default HeaderLayout;
