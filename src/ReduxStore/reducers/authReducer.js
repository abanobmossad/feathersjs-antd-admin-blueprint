import { AUTH_USER_FAILED, AUTH_USER_SUCCESS } from '../actions/types';
import configs from '../../configs';

const initialState = {
  user: null,
  authStatus: 'checking',
  userPermissions: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        userPermissions: action.payload[configs.USER_ROLES_PROP_NAME],
        authStatus: 'success',
      };
    case AUTH_USER_FAILED:
      return {
        ...state,
        authStatus: 'failed',
      };

    default:
      return state;
  }
}
