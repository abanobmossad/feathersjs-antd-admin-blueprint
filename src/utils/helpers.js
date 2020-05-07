import isEmpty from 'lodash/isEmpty';
import findIndex from 'lodash/findIndex';
import configs from '../configs';

export const capitalizeUserName = (name) => name.trim().replace(/\b\w/g, (l) => l.toUpperCase());

export const getUserIdentifier = (user) => {
  if (user.firstName && user.lastName) return capitalizeUserName(`${user.firstName} ${user.lastName}`);
  if (user.firstName) return capitalizeUserName(user.firstName);
  if (user.username) return user.username;

  return user.email;
};


export const permitted = (userPermissions, allowedPermissions = []) => {
  if (isEmpty(allowedPermissions)) return true;
  if (userPermissions.some((p) => allowedPermissions.includes(p))) {
    return true;
  }
  return false;
};

export const setPageTitle = (title) => {
  // update page title
  document.title = `${title} • ${configs.APP_NAME}`;
};


export const viewFile = (uri) => `${configs.BACKEND_URL}${uri}`;


export const updateArray = (array, id, newData) => {
// Find item index using _.findIndex (thanks @AJ Richardson for comment)
  const index = findIndex(array, { id });

  // Replace item at index using native splice
  array.splice(index, 1, newData);

  return array;
};
