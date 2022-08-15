import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import {
  Dimensions,
  Linking,
  PermissionsAndroid,
  PixelRatio,
  Platform,
  StyleSheet,
} from 'react-native';
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

  toAmap(location: LatLngName) {
    if (Platform.OS === 'android') {
      let url = `amapuri://route/plan?sourceApplication=rider&dlat=${location.latitude}&dlon=${location.longitude}&dev=0&dname=${location.dName}&t=0`;
      console.log('url', url);
      Linking.openURL(url);
    } else {
      let url = `amapuri://path?sourceApplication=rider&rideType=elebike&sourceApplication=appname&dlat=${location.latitude}&dlon=${location.longitude}&dev=0&dname=${location.dName}`;
      Linking.canOpenURL(url).then(res => {
        if (res) {
          Linking.openURL(url);
        }
      });
    }
  },

  translateStyle() {
    const dp2px = dp => PixelRatio.getPixelSizeForLayoutSize(dp);
    // const px2dp = px => PixelRatio.roundToNearestPixel(px);
    let designSize = {width: 750, height: 1344}; //假设设计尺寸为：720*1280
    let pxRatio = PixelRatio.get();
    let win_width = Dimensions.get('window').width;
    let win_height = Dimensions.get('window').height;
    let width = dp2px(win_width);
    let height = dp2px(win_height);
    let design_scale = designSize.width / width;
    height = height * design_scale;
    let scale = 1 / pxRatio / design_scale;

    const styles = StyleSheet.create({
      container: {
        width: width,
        height: height,
        transform: [
          {translateX: -width * 0.5},
          {translateY: -height * 0.5},
          {scale: scale},
          {translateX: width * 0.5},
          {translateY: height * 0.5},
        ],
      },
    });

    return styles;
  },
};

export default IdUtils;
