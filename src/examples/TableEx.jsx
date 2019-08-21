import React from 'react';
import { FormattedMessage } from 'react-intl';
import Table from '../components/Table';

const columns = [{
  key: 'User',
  title: <FormattedMessage id="cards.table.user" defaultMessage="Card User" />,
  dataIndex: 'user',
}, {
  key: 'amount',
  title: <FormattedMessage id="cards.table.amount" defaultMessage="Amount" />,
  dataIndex: 'amount',
}, {
  key: 'isActive',
  title: <FormattedMessage id="cards.table.isActive" defaultMessage="Active" />,
  dataIndex: 'isActive',
}, {
  key: 'minLimit',
  title: <FormattedMessage id="cards.table.minLimit" defaultMessage="Minimum limit" />,
  dataIndex: 'minLimit',
}, {
  key: 'maxLimit',
  title: <FormattedMessage id="cards.table.maxLimit" defaultMessage="Maximum limit" />,
  dataIndex: 'maxLimit',
}, {
  key: 'currency',
  title: <FormattedMessage id="cards.table.currency" defaultMessage="Currency" />,
  dataIndex: 'currency',
}, {
  key: 'createdAt',
  title: <FormattedMessage id="cards.table.createdAt" defaultMessage="Creation date" />,
}];

const table = () => <Table fetchData={{ path: 'orders' }} columns={columns} size="small" />;

export default table;
