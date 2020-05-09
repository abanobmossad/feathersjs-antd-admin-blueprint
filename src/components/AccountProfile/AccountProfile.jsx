import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Card, Avatar } from 'antd';
import { MailOutlined, PhoneOutlined, ReadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { viewFile } from '../../utils/helpers';
import AccountForm from './Form';
import { authenticateUser } from '../../ReduxStore/actions/authActions';

class AccountProfile extends Component {
renderSection = (Icon, section) => (
  <p style={{ margin: '1rem 0' }}>
    <Icon style={{ marginRight: '1rem' }} />
    {section || '-'}
  </p>
)

  renderProfileInfo = () => {
    const { loggedUser } = this.props;

    const avatar = loggedUser.avatar && viewFile(loggedUser.avatar);
    return (
      <Card className="profile__cards-left">
        <div className="profile__avatar">
          <Avatar
            shape="circle"
            src={avatar || '/images/avatarPH.svg'}
            size={100}
            style={{ marginBottom: '1rem' }}
            alt={loggedUser.name}
          />
          <h1 style={{ fontSize: '20px' }}>{loggedUser.name}</h1>
        </div>

        {this.renderSection(MailOutlined, loggedUser.email)}
        {this.renderSection(PhoneOutlined, loggedUser.mobileNum)}
        {this.renderSection(ReadOutlined, loggedUser.bio)}

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
  loggedUser: propTypes.instanceOf(Object).isRequired,
  dispatchAuthUser: propTypes.func.isRequired,
};

export default connect((state) => ({
  loggedUser: state.Auth.user,
}), {
  dispatchAuthUser: authenticateUser,
})(withRouter(AccountProfile));
