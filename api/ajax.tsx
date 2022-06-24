import AsyncStorage from '@react-native-async-storage/async-storage';

const query = async (url: string) => {
  try {
    const response = await network(url, 'GET');
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

const request = async (url: string, data: any = null) => {
  try {
    const response = await network(url, 'POST', data);
    const json = await response.json();
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

export {query, request};
