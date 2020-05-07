import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Card, Avatar, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { viewFile, getUserIdentifier } from '../../utils/helpers';
import AccountForm from './Form';
import { authenticateUser } from '../../ReduxStore/actions/authActions';

class AccountProfile extends Component {
renderSection = (icon, section) => (
  <p style={{ margin: '1rem 0' }}>
    <Icon type={icon} style={{ marginRight: '1rem' }} />
    {section || '-'}
  </p>
)

  renderProfileInfo = () => {
    const { currentUser: user } = this.props;

    const avatar = user.avatar && viewFile(user.avatar);
    return (
      <Card className="profile__cards-left">
        <div className="profile__avatar">
          <Avatar
            shape="circle"
            src={avatar || '/images/avatarPH.svg'}
            size={100}
            style={{ marginBottom: '1rem' }}
            alt={getUserIdentifier(user)}
          />
          <h1 style={{ fontSize: '20px' }}>{getUserIdentifier(user)}</h1>
          <p>{user.email}</p>
        </div>

        {this.renderSection('phone', user.mobileNum)}

      </Card>
    );
  }

  updateProfile = () => {
    const { dispatchAuthUser } = this.props;
    dispatchAuthUser();
  }

  render() {
    return (
      <div className="profile__content">
        {this.renderProfileInfo()}
        <Card className="profile__cards-right">
          <AccountForm onUpdate={(user) => this.updateProfile()} />
        </Card>
      </div>
    );
  }
}

AccountProfile.propTypes = {
  currentUser: propTypes.instanceOf(Object).isRequired,
  dispatchAuthUser: propTypes.func.isRequired,
};

export default connect((state) => ({
  currentUser: state.Auth.user,
}), {
  dispatchAuthUser: authenticateUser,
})(withRouter(AccountProfile));
