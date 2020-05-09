import React from 'react';
import { FormattedMessage } from 'react-intl';

export default {
  headerTitle: <FormattedMessage id="users.headerTitle" defaultMessage="Users" />,
  headerDesc: <FormattedMessage id="users.headerDesc" defaultMessage="All end users" />,
  name: <FormattedMessage id="users.name" defaultMessage="Name" />,
  email: <FormattedMessage id="users.email" defaultMessage="E-mail" />,
  mobileNum: <FormattedMessage id="users.mobileNum" defaultMessage="Mobile" />,
  isBlocked: <FormattedMessage id="users.isBlocked" defaultMessage="Blocked" />,
  notBlocked: <FormattedMessage id="users.notBlocked" defaultMessage="Not blocked" />,
};
