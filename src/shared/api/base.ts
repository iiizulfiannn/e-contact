import axios from 'axios';
import { API_URL } from 'shared/config';

export const apiInstance = axios.create({
  baseURL: API_URL,
  timeout: 60000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
