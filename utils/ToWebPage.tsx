import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from './RootNavigation';

const ToWebPage = async (url: string) => {
  let token = await AsyncStorage.getItem('localToken');
  let mobilePhone = await AsyncStorage.getItem('mobilePhone');
  if (!token) {
    navigate('Login', {});
  } else {
    navigate('WebPage', {
      url: url,
      token: token,
      mobilePhone: mobilePhone,
    });
  }
};

export default ToWebPage;
