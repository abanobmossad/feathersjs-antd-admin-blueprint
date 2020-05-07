import axios from 'axios';
import { CookieStorage } from 'cookie-storage';
import { message } from 'antd';
import configs from '../../configs';


export default function uploadFile(file, fileName, data = {}, endpoint = 'files') {
  if (!file || typeof file !== 'object') return;
  // uploading indicator
  message.loading('Uploading in progress..');

  // constrict data
  const formData = new FormData();
  formData.append(fileName, file);
  // append data object
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  // get access_token from cookies
  const cookie = new CookieStorage();
  // upload file
  axios.post(`${configs.BACKEND_URL}/${endpoint}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${cookie.getItem('access_token')}`,
    },
  }).catch((err) => {
    message.info('Sorry the upload failed');
  });
}
