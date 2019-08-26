import { AUTH_USER_SUCCESS, AUTH_USER_FAILED } from './types';
import server from '../../feathers';

export const authenticateUser = () => (dispatch) => {
  server.authenticate().then((response) => server.passport.verifyJWT(response.accessToken))
    .then((payload) => server.service('users').get(payload.userId))
    .then((user) => dispatch({
      type: AUTH_USER_SUCCESS,
      payload: user,
    }))
    .catch((error) => {
      dispatch({
        type: AUTH_USER_FAILED,
      });
    });
};
