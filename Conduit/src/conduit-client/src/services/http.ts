import { useAuth } from '@/contexts/AuthContext';
import { SERVER_BASE_URL } from '@/lib/constant';
import ValidationResult from '@/models/validationResult';
import axios, { AxiosError, AxiosResponse } from 'axios';

axios.defaults.baseURL = SERVER_BASE_URL;

axios.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 422:
        return Promise.reject(data)
      case 401:
        console.error('unauthorised');
        break;

      case 404:
        console.error('/not-found');
        break;

      case 500:
        console.error('/server-error');
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const http = {
  get: async <T>(url: string, token?: string) => 
    await axios.get<T>(url, buildHeader(token)).then(responseBody),
  post: async <T>(url: string, body: {}, token?: string) =>
    await axios.post<T>(url, body, buildHeader(token)).then(responseBody),
  put: async <T>(url: string, body: {}, token?: string) =>
    axios.put<T>(url, body, buildHeader(token)).then(responseBody),
};

const buildHeader = (token?: string) => !!token ? {
  headers: {
    Authorization: `Token ${token}`,
  },
} : {};

export default http;