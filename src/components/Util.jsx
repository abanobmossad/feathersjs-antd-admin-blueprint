import React from 'react';
import { Tag, Tooltip, Badge } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import isBoolean from 'lodash/isBoolean';
import moment from 'moment';

export const RenderDate = (date, tag = true) => (
  <Tooltip title={moment(date).format('ll, LT')}>
    {tag
      ? <Tag>{moment(date).format('DD-MM-YYYY')}</Tag>
      : moment(date).format('DD-MM-YYYY')}
  </Tooltip>
);

export const RenderFalsyValue = (value, tag = 'dot') => {
  if (!value && !isBoolean(value)) return '-';

  if (tag === 'icon') {
    return value ? <CheckOutlined /> : <CloseOutlined />;
  }

  if (tag === 'dot') {
    return value ? <Badge status="success" text="Yes" /> : <Badge status="error" text="NO" />;
  }
  return <Tag>{value ? 'YES' : 'NO'}</Tag>;
};
