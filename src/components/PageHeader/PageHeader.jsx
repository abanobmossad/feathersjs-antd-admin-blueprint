import React from 'react';
import propTypes from 'prop-types';
import { PageHeader as AntPageHeader, Typography, Icon } from 'antd';
import { Helmet } from 'react-helmet';
import config from '../../configs';

const PageHeader = ({
  title, extra, description, img, icon, pageTitle,
}) => (
  <AntPageHeader
    className="page__header"
    style={{ margin: '-24px' }}
    title={(
      <>
        {icon && <Icon type={icon} /> }
        {icon && '  '}
        {title}
      </>
)}
    extra={extra}
  >
    <Helmet>
      <meta charSet="utf-8" />
      <title>{pageTitle}</title>
    </Helmet>

    <div className="page__wrap">
      <div className="page__content">
        <Typography.Paragraph>
          {description}
        </Typography.Paragraph>
      </div>
      <div className="page__extraContent">
        <div className="page__extraContent-img">
          {img && (
          <img
            width="100%"
            src={img}
            alt="content img description"
          />
          )}
        </div>
      </div>
    </div>
  </AntPageHeader>
);
PageHeader.defaultProps = {
  extra: undefined,
  img: undefined,
  description: undefined,
  icon: undefined,
  pageTitle: config.APP_NAME,
};

PageHeader.propTypes = {
  title: propTypes.oneOfType([propTypes.string, propTypes.element]).isRequired,
  pageTitle: propTypes.string,
  extra: propTypes.element,
  img: propTypes.string,
  icon: propTypes.string,
  description: propTypes.oneOfType([propTypes.string, propTypes.element]),
};

export default PageHeader;
