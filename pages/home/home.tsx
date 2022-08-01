import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
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
    }

    if (Platform.OS === 'ios') {
      IdUtils.watchLocation();
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
    <View style={styles.homeBg}>
      <SafeAreaView style={styles.topSafeArea} />
      <StatusBar backgroundColor="#1677FE" barStyle={'light-content'} />

      <Header
        status={status}
        navigation={props.navigation}
        infoStatus={infoStatus}
      />
      <TabContent isLogin={isLogin} navigation={props.navigation} />
      <SafeAreaView style={styles.bottomSafeArea} />
    </View>
  );
};

const styles = StyleSheet.create({
  homeBg: {
    backgroundColor: '#1677FE',
    flex: 1,
  },
  topSafeArea: {
    backgroundColor: '#1677FE',
    flex: 0,
  },
  bottomSafeArea: {
    backgroundColor: 'white',
    flex: 0,
  },
});

export default App;
