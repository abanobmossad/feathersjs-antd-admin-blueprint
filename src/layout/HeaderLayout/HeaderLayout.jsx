import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import ProfileMenu from '../../components/ProfileMenu';
import config from '../../configs';
import SearchInput from '../../pages/Search/SearchInput';

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
        <img src={config.APP_LOGO_PATH} alt="LOGO" width="200" height="55" />
      </Link>
    </div>

    {/* Add more header items here ...  */}


    {/* Add search pages functionality */}
    <SearchInput />

    {/* settings */}
    {/* <Settings className="layout__header__item" /> */}

    {/* profile menu */}
    <ProfileMenu className="layout__header__item" />


    {/* <Notifications className="layout__header__item" messageIndexName="messageAr" /> */}
  </Layout.Header>
);

export default HeaderLayout;
