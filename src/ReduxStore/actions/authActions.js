import { AUTH_USER_SUCCESS, AUTH_USER_FAILED } from './types';
import server from '../../feathers';

export const authenticateUser = () => (dispatch) => {
  server.reAuthenticate().then((res) => {
    dispatch({
      type: AUTH_USER_SUCCESS,
      payload: res.user,
    });
  })
    .catch((error) => {
      dispatch({
        type: AUTH_USER_FAILED,
      });
    });
};
