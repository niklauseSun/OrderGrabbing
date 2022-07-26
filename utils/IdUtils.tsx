import {PermissionsAndroid, Platform} from 'react-native';
import {Geolocation, Position} from 'react-native-amap-geolocation';
import { WatchLocation } from './types';
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

    return new Promise((resolve, reject: any) => {
      Geolocation.watchPosition((coordiate: Position) => {
        resolve(coordiate);
      });
    })
  },
};

export default IdUtils;
