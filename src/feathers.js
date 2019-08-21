import feathers from '@feathersjs/client';
import { CookieStorage } from 'cookie-storage';
import axios from 'axios';
import configs from './configs';

const app = feathers();
// Initialize a REST connection
const client = feathers.rest(configs.BACKEND_URL);

app.configure(client.axios(axios));

app.configure(feathers.authentication({
  storage: new CookieStorage(),
  storageKey: 'access_token',
}));

export default app;
