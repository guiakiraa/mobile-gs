import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    console.log('Resposta:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  async (error) => {
    console.error('Erro na resposta:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL
      }
    });
    return Promise.reject(error);
  }
);

export default api; 