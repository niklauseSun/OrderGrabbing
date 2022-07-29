import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  StyleSheet,
  DeviceEventEmitter,
  View,
  Platform,
} from 'react-native';

import Identify from '../../utils/Identify';
import IdUtils from '../../utils/IdUtils';
import Header from './components/header';
import TabContent from './components/tabContent';
import {Position} from 'react-native-amap-geolocation/src';
import {LatLng} from '../../utils/types';
import {rider} from '../../api';

const App = (props: {navigation: any}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [isLogin, setLogStatus] = useState(false);
  const [status, setStatus] = useState('');
  const [infoStatus, setInfoStatus] = useState('');
  const [loading, setLoading] = useState(true);

  const getLocation = () => {
    IdUtils.toGetLocation().then(res => {
      console.log('getLocation', res);
      const {location} = res as Position;
      let loca: LatLng = {
        latitude: Number(location.latitude.toFixed(6)),
        longitude: Number(location.longitude.toFixed(6)),
      };
      rider
        .updateRiderLocation({
          latitude: location.latitude + '',
          longitude: location.longitude + '',
        })
        .then(ret => {
          console.log('update location', ret);
        });
      AsyncStorage.setItem('currentLocation', JSON.stringify(loca));
    });
  };

  useEffect(() => {
    Identify(false).then(res => {
      console.log('Identify', res);
      if (res.isLogin) {
        // 如果成功了
        setLogStatus(true);
        const {status: stat, infoStatus: info} = res;
        setStatus(stat);
        setInfoStatus(info);
        AsyncStorage.setItem('status', stat);
        AsyncStorage.setItem('infoStatus', info);

        setLoading(false);
      } else {
        props.navigation.replace('Login');
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

    if (Platform.OS === 'android') {
      getLocation();
      setInterval(() => {
        getLocation();
      }, 30 * 1000);
    } else {
      IdUtils.watchLocation().then(value => {
        console.log('location', value);

        const {location} = value as Position;
        let loca: LatLng = {
          latitude: Number(location.latitude.toFixed(6)),
          longitude: Number(location.longitude.toFixed(6)),
        };

        rider.updateRiderLocation({
          latitude: location.latitude + '',
          longitude: location.longitude + '',
        });
        AsyncStorage.setItem('currentLocation', JSON.stringify(loca));
      });
    }
  }, [props.navigation]);

  if (loading) {
    return (
      <SafeAreaView>
        <View />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.homeBg}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#1677FE"
      />
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
