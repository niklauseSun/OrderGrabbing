import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native';

import Identify from '../../utils/Identify';
import IdUtils from '../../utils/IdUtils';
import Header from './components/header';
import TabContent from './components/tabContent';
import {Position} from 'react-native-amap-geolocation/src';
import {LatLng} from '../../utils/types';

const App = (props: {navigation: any}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [isLogin, setLogStatus] = useState(false);
  const [status, setStatus] = useState('');
  const [infoStatus, setInfoStatus] = useState('');

  useEffect(() => {
    Identify(false).then(res => {
      console.log('Identify', res);
      if (res) {
        // 如果成功了
        setLogStatus(true);
        const {status: stat, infoStatus: info} = res;
        setStatus(stat);
        setInfoStatus(info);
        AsyncStorage.setItem('status', stat);
        AsyncStorage.setItem('infoStatus', info);
      }
    });
    DeviceEventEmitter.addListener('refreshStatus', () => {
      console.log('refreshStatus');
      Identify(false).then(res => {
        console.log('Identify', res);
        if (res) {
          // 如果成功了
          const {status: stat, infoStatus: info} = res;
          setStatus(stat);
          setInfoStatus(info);
        }
      });
    });

    IdUtils.watchLocation().then(value => {
      console.log('location', value);

      const {location} = value as Position;
      let loca: LatLng = {
        latitude: Number(location.latitude.toFixed(6)),
        longitude: Number(location.longitude.toFixed(6)),
      };
      AsyncStorage.setItem('currentLocation', JSON.stringify(loca));
    });
  }, []);

  return (
    <SafeAreaView style={styles.homeBg}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header
        status={status}
        navigation={props.navigation}
        infoStatus={infoStatus}
      />
      <TabContent isLogin={isLogin} navigation={props.navigation} />
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
