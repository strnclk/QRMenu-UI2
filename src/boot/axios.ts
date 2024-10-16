import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// ResponseAPI arayüzünü tanımlayın
// src/boot/axios.ts
export interface ResponseAPI<T> {
  success: boolean;
  message?: string;
  data: T;
  limit?: number;   // limit alanını ekleyin
  offset?: number;  // offset alanını ekleyin
}


// API istemcisini oluşturun
const api = axios.create({ baseURL: 'https://api.example.com' });

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios; // Vue Options API'de kullanılabilir
  app.config.globalProperties.$api = api;     // Vue Options API'de kullanılabilir
});

// api'yi dışa aktarın
export { api };
