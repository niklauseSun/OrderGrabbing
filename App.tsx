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
import {Text, TouchableOpacity} from 'react-native';
import Provider from '@ant-design/react-native/lib/provider';
import {navigationRef} from './utils/RootNavigation';

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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
