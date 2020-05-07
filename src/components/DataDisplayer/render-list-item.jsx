import React from 'react';
import { Descriptions } from 'antd';
import get from 'lodash/get';

const renderItem = (data, item) => (item.render
  ? item.render(get(data, item.dataIndex))
  : get(data, item.dataIndex));

const renderListItem = (columns, data) => (
  <Descriptions>
    {columns.map((item) => (
      <Descriptions.Item
        key={item.dataIndex}
        label={item.title}
      >
        {renderItem(data, item)}
      </Descriptions.Item>
    ))}
  </Descriptions>
);

export default renderListItem;
