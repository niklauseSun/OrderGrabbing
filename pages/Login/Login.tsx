import React, {useEffect, useState} from 'react';
import {
  DeviceEventEmitter,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import ConfirmProtocol from './components/ConfirmProtocol';
import LgoinInput from './components/LoginInput';

const Login = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';

  console.log('navigation', route);
  const [isProtocolSelect, setProtocolSelect] = useState(false);
  const [loginType, setLoginType] = useState('start');

  useEffect(() => {
    const {source} = route.params || {};
    if (source === 'webview') {
      setProtocolSelect(true);
      setLoginType(source);
    }
  }, [navigation, route.params]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const changeSelect = (state: boolean) => {
    setProtocolSelect(state);
  };

  const navigateReset = () => {
    navigation.replace('Home');

    DeviceEventEmitter.emit('refresh');
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.innerContainer}>
        <LgoinInput
          isProtocolSelect={isProtocolSelect}
          navigateReset={navigateReset}
        />
        <ConfirmProtocol
          changeSelect={changeSelect}
          isSelect={isProtocolSelect}
          type={loginType}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%',
  },
  wxButton: {
    marginLeft: 20,
    marginRight: 20,
    height: 45,
    borderRadius: 10,
    backgroundColor: '#54B937',
    borderColor: '#54B937',
    width: 330,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneButton: {
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    backgroundColor: '#1677FE',
    height: 45,
    fontSize: 15,
    width: 330,
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
  },
  helloImage: {
    width: 120,
    height: 120,
    marginTop: 100,
    marginBottom: 70,
  },

  logo: {
    marginTop: 120,
    marginBottom: 100,
    width: 90,
    height: 90,
  },
});

export default Login;
