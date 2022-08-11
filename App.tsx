/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';

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
import {DeviceEventEmitter, Platform} from 'react-native';
import {init} from 'react-native-amap-geolocation/src';

import 'react-native-reanimated';
import {Toast} from '@ant-design/react-native';
import JPush from 'jpush-react-native';

Toast.config({
  duration: 0.6,
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
  useEffect(() => {
    // console.log('init', JPush);
    // JPush.init({
    //   appKey: '0518b2aa5c67e6377c0692f5',
    //   channel: 'dev',
    //   production: false,
    // });

    JPush.setBadge({
      appBadge: 0,
      badge: 0,
    });

    const connectListener = result => {
      console.log('connectListener:' + JSON.stringify(result));
    };
    JPush.addConnectEventListener(connectListener);
    //通知回调
    const notificationListener = result => {
      console.log('notificationListener:', result);
      const {extras} = result;
      const {type} = extras;
      if (type === 'new_order') {
        DeviceEventEmitter.emit('refresh', 0);
      }
    };
    JPush.addNotificationListener(notificationListener);
    //本地通知回调
    const localNotificationListener = result => {
      console.log('localNotificationListener:' + JSON.stringify(result));
    };
    JPush.addLocalNotificationListener(localNotificationListener);
    //自定义消息回调
    // this.customMessageListener = result => {
    //     console.log("customMessageListener:" + JSON.stringify(result))
    // };
    // JPush.addCustomMessagegListener(this.customMessageListener);
    //tag alias事件回调
    const tagAliasListener = result => {
      console.log('tagAliasListener:' + JSON.stringify(result));
    };
    JPush.addTagAliasListener(tagAliasListener);
    //手机号码事件回调
    const mobileNumberListener = result => {
      console.log('mobileNumberListener:' + JSON.stringify(result));
    };
    JPush.addMobileNumberListener(mobileNumberListener);
  }, []);

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

// const app = () => {}

export default App;
