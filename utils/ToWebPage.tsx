import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from './RootNavigation';

const ToWebPage = async (url: string) => {
  let token = await AsyncStorage.getItem('localToken');
  if (!token) {
    navigate('Login', {});
  } else {
    navigate('WebPage', {
      url: url,
      token: token,
    });
  }
};

export default ToWebPage;
