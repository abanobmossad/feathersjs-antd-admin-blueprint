import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import pagesSpecs from '../configs/pages';
import AuthRoute from '../layout/AuthRoute';

const getSpecs = (page) => {
  if (page.pageSpecs) {
    return { ...page.pageSpecs, component: page };
  }
  return page;
};


export const generateSecureRoutes = (pages = pagesSpecs) => pages
  .map((page) => {
    const {
      path, supPages, component: Component, props,
    } = getSpecs(page);
    if (supPages) return generateSecureRoutes(supPages);
    return (
      <AuthRoute exact key={path} path={path} component={() => <Component {...props} />} />
    );
  });


export const generateSiderItems = (user, pages = pagesSpecs) => pages
  .filter((p) => (p.pageSpecs ? !p.pageSpecs.hideInMenu : !p.hideInMenu))
  .map((page) => {
    const {
      path, icon, supPages, title,
    } = getSpecs(page);

    if (supPages) {
      return (
        <Menu.SubMenu key={path} icon={icon} title={title}>
          {generateSiderItems(user, supPages)}
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.Item key={path} style={{ fontSize: 14 }}>
        <Link to={path}>
          {icon}
          <span>{title}</span>
        </Link>
      </Menu.Item>
    );
  });
