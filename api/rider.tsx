import {request, query} from './ajax';

const rider = {
  sendCaptcha: async (params: any) => {
    return request('/api/rider/captcha', params);
  },
  loginWithCaptcha: async (params: any) => {
    return request('/api/rider/captcha-login', params);
  },
  loginWithPassword: async (params: any) => {
    return request('/api/rider/password-login', params, false);
  },
  getRiderInfo: async () => {
    return query('/api/rider/query-rider-info');
  },
  switchUserStatus: async (params: any) => {
    return request('/api/rider/change-rider-status?status=' + params.status);
  },
  updateRiderLocation: async (params: any) => {
    return request('/api/rider/upload-location', params, true);
  },
};

export default rider;
