import {PermissionsAndroid, Platform} from 'react-native';
import {Geolocation} from 'react-native-amap-geolocation';
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
        ({coords}) => {
          console.log(coords);
          resolve(coords);
        },
        err => {
          reject(err);
        },
      );
    });
  },
};

export default IdUtils;
