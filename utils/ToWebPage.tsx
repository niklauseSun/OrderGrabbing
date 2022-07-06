import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from './RootNavigation';

const ToWebPage = async (url: string) => {
  let token = await AsyncStorage.getItem('token');
  if (!token) {
    navigate('Login', {});
  } else {
    navigate('WebViewPage', {
      url: url,
      token: token,
    });
  }
};

export default ToWebPage;
