import feathers from '@feathersjs/client';
import { CookieStorage } from 'cookie-storage';
import axios from 'axios';
import configs from './configs';

const app = feathers();
// Initialize a REST connection
const client = feathers.rest(configs.BACKEND_URL);

app.configure(client.axios(axios));

const cookieStorage = new CookieStorage();

app.configure(feathers.authentication({
  storage: cookieStorage,
  storageKey: 'access_token',
}));


export const getUserToken = () => cookieStorage.getItem('access_token');

export default app;
