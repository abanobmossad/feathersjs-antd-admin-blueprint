import React from 'react';
import { Select, Avatar } from 'antd';

const renderTemp = (data, ref) => {
  switch (ref) {
    case 'users':
      return (
        data.map((v) => (
          <Select.Option key={v.id} value={v.id}>
            <Avatar size="small" icon="user" />
            {` ${v.username} (${v.email})`}
          </Select.Option>
        ))
      );
    default:
      return null;
  }
};


export default renderTemp;
