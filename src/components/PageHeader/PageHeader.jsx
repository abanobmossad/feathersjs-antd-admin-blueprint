import React from 'react';
import propTypes from 'prop-types';
import { PageHeader as AntPageHeader, Typography } from 'antd';
import config from '../../configs';
import colors from '../../configs/colors';
import { setPageTitle } from '../../utils/helpers';

const PageHeader = ({
  title, extra, description, banner, icon, pageTitle,
}) => {
  const HeaderIcon = icon;
  return (
    <AntPageHeader
      className="page__header"
      style={{ margin: '-24px -24px 10px -24px', backgroundColor: '#fff' }}
      title={(
        <span style={{ color: colors['pages-headers'] }}>
          {icon && <HeaderIcon style={{ marginRight: '1rem' }} />}
          {title}
        </span>
      )}
      extra={extra}
    >
      {setPageTitle(pageTitle)}
      <div className="page__wrap">
        <div className="page__content">
          <Typography.Paragraph>
            {description}
          </Typography.Paragraph>
        </div>
        <div className="page__extraContent">
          <div className="page__extraContent-img">
            {banner && <img width="100%" src={banner} height="150" alt={title} />}
          </div>
        </div>
      </div>
    </AntPageHeader>
  );
};

PageHeader.defaultProps = {
  extra: undefined,
  banner: undefined,
  description: undefined,
  icon: undefined,
  pageTitle: config.APP_NAME,
};

PageHeader.propTypes = {
  title: propTypes.oneOfType([propTypes.string, propTypes.element]).isRequired,
  pageTitle: propTypes.string,
  extra: propTypes.element,
  banner: propTypes.string,
  icon: propTypes.elementType,
  description: propTypes.oneOfType([propTypes.string, propTypes.element]),
};

export default PageHeader;
