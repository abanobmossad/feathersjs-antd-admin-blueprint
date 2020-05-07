import { AUTH_USER_FAILED, AUTH_USER_SUCCESS } from '../actions/types';

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
