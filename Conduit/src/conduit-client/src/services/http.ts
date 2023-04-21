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
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) =>
        axios.post<T>(url, body).then(responseBody),
};

export default http;