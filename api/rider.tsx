import {request, query} from './ajax';

const rider = {
  sendCaptcha: async (params: any) => {
    return request('/api/rider/captcha', params);
  },
  loginWithCaptcha: async (params: any) => {
    return request('/api/rider/captcha-login', params);
  },
  loginWithPassword: async (params: any) => {
    return request('/api/rider/password-login', params);
  },
  getRiderInfo: async () => {
    return query('/api/rider/query-rider-info');
  },
};

export default rider;
