import React, { Component } from 'react';
import { Tag } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { RenderFalsyValue } from '../../components/Util';
import messages from './local-messages';
import DataDisplayer from '../../components/DataDisplayer';

class Users extends Component {
  // table column
  getColumns = () => [{
    key: 'name',
    title: messages.name,
    dataIndex: 'name',
  }, {
    key: 'email',
    title: messages.email,
    dataIndex: 'email',
    render: (email) => <Tag>{email}</Tag>,
  }, {
    key: 'mobileNum',
    title: messages.mobileNum,
    dataIndex: 'mobileNum',
    render: (firstName) => firstName || RenderFalsyValue(firstName),
  }, {
    key: 'isBlocked',
    title: messages.isBlocked,
    dataIndex: 'isBlocked',
    filters: [
      { text: messages.blocked, value: true },
      { text: messages.notBlocked, value: false },
    ],
    filterMultiple: false,
    render: (isBlocked) => RenderFalsyValue(isBlocked),
  },
  ]

  render() {
    const { loggedUser, query } = this.props;
    return (
      <DataDisplayer
        pageHeader={{
          icon: TeamOutlined,
          title: messages.headerTitle,
          description: messages.headerDesc,
          pageTitle: 'users',
          banner: '/images/banners/users.svg',
        }}
        endpoint="users"
        columns={this.getColumns()}
        query={query}
        removeBtn={(user) => user.id !== loggedUser.id}
        actions={(user) => {
          if (user.id === loggedUser.id) {
            return [<Tag key="you" color="#2db7f5">You</Tag>];
          }
          return [];
        }}
      />
    );
  }
}

Users.pageSpecs = {
  path: '/users',
  icon: <TeamOutlined />,
  title: 'Users',
  props: { query: { isAdmin: false } },
};

Users.defaultProps = {
  query: null,
};

Users.propTypes = {
  loggedUser: propTypes.instanceOf(Object).isRequired,
  query: propTypes.instanceOf(Object),
};


export default connect((state) => ({
  loggedUser: state.Auth.user,
}))(Users);
