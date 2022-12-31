import { useMemo } from 'react';
import Axios from 'axios';
import { API_URL } from '@env';

export default () => {
  const api = useMemo(() => {
    const axios = Axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    axios.interceptors.request.use((config) =>
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }

       config
    );

    return axios;
  }, []);

  return api;
}
