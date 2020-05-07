import React from 'react';
import { Menu } from 'antd';
import Icon from 'react-fontawesome';
import { Link } from 'react-router-dom';
import pagesObj from '../configs/pages';
import AuthRoute from '../layout/AuthRoute';

export const generateSecureRoutes = (pages = pagesObj) => pages.map((page) => {
  if (page.supPages) return generateSecureRoutes(page.supPages);
  return (
    <AuthRoute
      exact
      key={page.path}
      path={page.path}
      component={() => (
        <page.component
          title={page.title}
          icon={page.icon}
          description={page.description}
          banner={page.banner && `/images/${page.banner}`}
          {...page.props || {}}
        />
      )}
    />
  );
});


export const generateSiderItems = (userPermissions, pages = pagesObj) => pages
  .filter((p) => !p.hideInMenu)
  .map((page) => {
    if (page.supPages) {
      return (
        <Menu.SubMenu
          key={page.path}
          style={{ fontSize: 14 }}
          icon={<Icon name={page.icon} style={page.iconColor && { color: page.iconColor }} />}
          title={(
            <span>
              <span>{page.title.toUpperCase()}</span>
            </span>
              )}
        >
          {generateSiderItems(userPermissions, page.supPages)}
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.Item
        icon={<Icon name={page.icon} style={page.iconColor && { color: page.iconColor }} />}
        key={page.path}
        style={{ fontSize: 14 }}
      >
        <Link className="layout__link" to={page.path}>
          {' '}
          <span>{page.title.toUpperCase()}</span>
        </Link>
      </Menu.Item>
    );
  });
