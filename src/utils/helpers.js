export const capitalizeUserName = (name) => name.trim().replace(/\b\w/g, (l) => l.toUpperCase());

export const getUserIdentifier = (user) => {
  if (user.username) return user.username;
  if (user.firstName) return capitalizeUserName(`${user.firstName} ${user.lastName}`);
  if (user.fullName) return capitalizeUserName(user.fullName);

  if (user.profile && user.profile.firstName) {
    return capitalizeUserName(`${user.profile.firstName} ${user.profile.lastName}`);
  }
  if (user.profile && user.profile.fullName) {
    return capitalizeUserName(user.fullName);
  }

  return user.email;
};
