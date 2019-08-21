import React from 'react';
import { Avatar, Tooltip } from 'antd';
import propTypes from 'prop-types';
import { getUserIdentifier } from '../../utils/helpers';

// EDIT `src` attr by the user  profile avatar link

const UserAvatar = ({ user, showTip, showIdentifier }) => {
  const renderAvatar = (
    <>
      <Avatar src="/images/userPH.jpg" size="large" alt={getUserIdentifier(user)} />
      {showIdentifier && (
      <span
        className="user__avatar-identifier"
      >
        {getUserIdentifier(user)}
      </span>
      )}
    </>
  );
  if (showTip) {
    return (
      <Tooltip title={getUserIdentifier(user)}>
        {renderAvatar}
      </Tooltip>
    );
  }
  return renderAvatar;
};

UserAvatar.defaultProps = {
  showTip: true,
  showIdentifier: false,
};

UserAvatar.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
  showTip: propTypes.bool,
  showIdentifier: propTypes.bool,
};
export default UserAvatar;
