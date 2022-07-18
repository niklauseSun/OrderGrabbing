import AsyncStorage from '@react-native-async-storage/async-storage';
import ToLogin from '../utils/ToLogin';

const query = async (url: string) => {
  try {
    const response = await network(url, 'GET');
    const json = await response.json();
    if (json.code === 100) {
      ToLogin();
    }
    return json;
  } catch (error) {
    console.log(error);
  }
};

const request = async (url: string, data: any = null) => {
  try {
    const response = await network(url, 'POST', data);
    const json = await response.json();
    if (json.code === 100) {
      ToLogin();
    }
    return json;
  } catch (error) {
    console.log(error);
  }
};

const upload = async (url: string, data: any = null) => {
  try {
    const response = await uploadNetWork(url, 'POST', data);
    const json = await response.json();
    if (json.code === 100) {
      ToLogin();
    }
    return json;
  } catch (error) {
    console.log(error);
  }
};

const network = async (url: string, method = 'GET', data = null) => {
  console.log('net', url, method);
  const header = await getHeader();
  let params = {
    method: method,
    headers: header,
    body: data == null ? '' : JSON.stringify(data),
  };
  console.log('net', params);

  return fetch('https://rider-test-app.zhuopaikeji.com' + url, params);
};

const uploadNetWork = async (url: string, method = 'GET', data = null) => {
  console.log('net', url, method);
  const header = await getUploadHeader();
  let params = {
    method: method,
    headers: header,
    body: data,
  };
  console.log('net', params);

  return fetch('https://rider-test-app.zhuopaikeji.com' + url, params);
};

const getHeader = async () => {
  let header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'tenant-code': '10001',
    Authorization: '',
  };
  try {
    let token = await AsyncStorage.getItem('localToken');
    if (token) {
      header.Authorization = 'Bearer ' + token;
    }
    return header;
  } catch (error) {
    return header;
  }
};

const getUploadHeader = async () => {
  let header = {
    'tenant-code': '10001',
    Authorization: '',
  };
  try {
    let token = await AsyncStorage.getItem('localToken');
    if (token) {
      header.Authorization = 'Bearer ' + token;
    }
    return header;
  } catch (error) {
    return header;
  }
};

export {query, request, upload};
