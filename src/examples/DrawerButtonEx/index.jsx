import React from 'react';
import { Tag } from 'antd';
import DrawerButton from '../../components/DrawerButton';
import View from '../../components/View';

const schema = {
  title: 'Orders Info',
  data: [
    { label: 'Amount', dataIndex: 'amount' },
    { label: 'Status', dataIndex: 'status', render: (status) => <Tag>{status}</Tag> },
  ],
};

const AddButtonEx = (props) => (
  <DrawerButton
    // path="/add-order"
    buttonTitle="View order"
    content={(closeEvent) => <View refId="P-fb29ReH" path="orders" schema={schema} onDrawerClose={closeEvent} />}
  />
);

export default AddButtonEx;
