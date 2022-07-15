import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  useColorScheme,
  Text,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import CancelOrder from '../../utils/CancelOrder';
import GetOrder from '../../utils/GetOrder';
import Identify from '../../utils/Identify';
import ToLogin from '../../utils/ToLogin';
import Header from './components/header';
import TabContent from './components/tabContent';

const App = (props: {navigation: any}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [isLogin, setLogStatus] = useState(false);
  const [status, setStatus] = useState();

  useEffect(() => {
    Identify().then(res => {
      console.log('Identify', res);
      if (res) {
        // 如果成功了
        setLogStatus(true);
        const {status: stat} = res.result;
        setStatus(stat);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.homeBg}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header status={status} navigation={props.navigation} />
      <TabContent isLogin={isLogin} />
      {/*
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <TouchableOpacity
          onPress={() => {
            console.log('去登录');
            ToLogin({navigation: navigation});
            // navigation.navigate('Login');
          }}>
          <Text>去登录</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Detail');
          }}>
          <Text>去详情</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text>去验证</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            GetOrder({
              visible: true,
            });
          }}>
          <Text>抢单</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            CancelOrder();
          }}>
          <Text>去取消</Text>
        </TouchableOpacity>
      </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeBg: {
    backgroundColor: '#1677FE',
    flex: 1,
  },
});

export default App;
