import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import {Linking, PermissionsAndroid, Platform} from 'react-native';
import {Geolocation, Position} from 'react-native-amap-geolocation';
import {rider} from '../api';
import {LatLng} from './types';
const IdUtils = {
  isPhoneNum(num: string | number) {
    let phone = num + '';
    var myreg = /^1[3-9]\d{9}$/;
    if (!myreg.test(phone)) {
      return false;
    } else {
      return true;
    }
  },
  async toGetLocation() {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
    }
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        res => {
          console.log('success', res);
          resolve(res);
        },
        error => {
          console.log('error', error);
          reject(error);
        },
      );
    });
  },

  async watchLocation() {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
    }

    let beginTime = 0;
    Geolocation.watchPosition((coordiate: Position) => {
      let endTime = new Date().getTime();

      if (beginTime === 0 || (endTime - beginTime) / 1000 > 30) {
        beginTime = new Date().getTime();
        const {location} = coordiate;
        let loca: LatLng = {
          latitude: Number(location.latitude.toFixed(6)),
          longitude: Number(location.longitude.toFixed(6)),
        };

        rider.updateRiderLocation({
          latitude: location.latitude + '',
          longitude: location.longitude + '',
        });

        AsyncStorage.setItem('currentLocation', JSON.stringify(loca));
      }

      _.debounce(() => {});
    });
  },

  toAmap(location: LatLng) {
    if (Platform.OS === 'android') {
      let url = `amapuri://openFeature?featureName=OnRideNavi&rideType=elebike&sourceApplication=appname&lat=${location.latitude}&lon=${location.longitude}&dev=0`;
      Linking.canOpenURL(url).then(res => {
        if (res) {
          Linking.openURL(url);
        }
      });
    } else {
      let url = `amapuri://openFeature?featureName=OnRideNavi&rideType=elebike&sourceApplication=appname&lat=${location.latitude}&lon=${location.longitude}&dev=0`;
      Linking.canOpenURL(url).then(res => {
        if (res) {
          Linking.openURL(url);
        }
      });
    }
  },
};

export default IdUtils;
