import { getTokenFromLocalStorage } from '@src/utils/localStorage';
import axios, { AxiosRequestConfig } from 'axios';

function addTokenToHeaders(config: AxiosRequestConfig) {
  const token = getTokenFromLocalStorage();

  if (token) {
    if (!config.headers) {
      config.headers = {};
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

export const axiosInstance = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    'Content-Type': 'application/json'
  }
});
axiosInstance.interceptors.request.use(addTokenToHeaders);
