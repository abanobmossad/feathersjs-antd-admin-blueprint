export const capitalizeUserName = (name) => name.trim().replace(/\b\w/g, (l) => l.toUpperCase());

export const getUserIdentifier = (user) => {
  if (user.username) return user.username;
  if (user.firstName) return capitalizeUserName(`${user.firstName} ${user.lastName}`);

  if (user.profile && user.profile.firstName) {
    return capitalizeUserName(`${user.profile.firstName} ${user.profile.lastName}`);
  }

  return user.email;
};
