import React from 'react';
import propTypes from 'prop-types';
import { PageHeader as AntPageHeader, Typography, Icon } from 'antd';

const PageHeader = ({
  title, extra, description, img, icon,
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
};

PageHeader.propTypes = {
  title: propTypes.oneOfType([propTypes.string, propTypes.element]).isRequired,
  extra: propTypes.element,
  img: propTypes.string,
  icon: propTypes.string,
  description: propTypes.oneOfType([propTypes.string, propTypes.element]),
};

export default PageHeader;
