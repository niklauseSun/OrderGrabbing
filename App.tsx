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
import WebViewPage from './pages/webPage/webPage';
import {Text, TouchableOpacity} from 'react-native';
import Provider from '@ant-design/react-native/lib/provider';
import {navigationRef} from './utils/RootNavigation';

import {AMapSdk} from 'react-native-amap3d';
import {Platform} from 'react-native';

// 地图
AMapSdk.init(
  Platform.select({
    android: 'c52c7169e6df23490e3114330098aaac',
    ios: '57b7dcf824bf28a372f2bb5031a8628b',
  }),
);

// 定位
// init({
//   ios: '9bd6c82e77583020a73ef1af59d0c759',
//   android: '57b7dcf824bf28a372f2bb5031a8628b',
// });

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
            component={LoginPage}
            options={{title: '登录', headerBackTitle: ''}}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{
              title: '订单详情',
              headerBackTitle: '',
              headerRight: () => {
                return (
                  <TouchableOpacity activeOpacity={0.7}>
                    <Text>客服</Text>
                  </TouchableOpacity>
                );
              },
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
            name="WebViewPage"
            component={WebViewPage}
            options={{title: 'webview', headerShown: false}} // 隐藏头
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
