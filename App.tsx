/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import createNativeStackNavigator from '@react-navigation/native-stack/lib/module/navigators/createNativeStackNavigator';

import HomePage from './pages/home/home';
import LoginPage from './pages/Login/Login';
import Detail from './pages/detail/detail';
import CameraPage from './pages/camera/CameraPage';
import ScanCamera from './pages/scanCamera/scanCamera';
import WebPage from './pages/webPage/webPage';
import Provider from '@ant-design/react-native/lib/provider';
import {navigationRef} from './utils/RootNavigation';

import {AMapSdk} from 'react-native-amap3d';
import {Platform} from 'react-native';
import {init} from 'react-native-amap-geolocation/src';

import 'react-native-reanimated';
import {Toast} from '@ant-design/react-native';

Toast.config({
  duration: 0.4,
});

// 地图
AMapSdk.init(
  Platform.select({
    android: '9b19a59f94881372e6a6f57c2eba8abc',
    ios: '486dc6cedc8fd2c6fda9b8f6ca84e117',
  }),
);

// 定位
init({
  ios: '486dc6cedc8fd2c6fda9b8f6ca84e117',
  android: '9b19a59f94881372e6a6f57c2eba8abc',
});

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{title: '首页', headerShown: false}} // 隐藏头
            component={HomePage}
          />
          <Stack.Screen
            key={'Login'}
            name="Login"
            options={{title: '登录', headerShown: false}} // 隐藏头
            component={LoginPage}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{
              title: '订单详情',
              headerBackTitle: '',
            }}
          />
          <Stack.Screen
            name="CameraPage"
            component={CameraPage}
            options={{
              title: '拍照',
              headerBackTitle: '',
            }}
          />
          <Stack.Screen
            name="ScanCamera"
            component={ScanCamera}
            options={{
              title: '扫一扫',
              headerBackTitle: '',
            }}
          />
          <Stack.Screen
            name="WebPage"
            component={WebPage}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#1677FE',
              },
              headerTintColor: '#fff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
