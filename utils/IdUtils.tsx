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
  toGetLocation() {},
};

export default IdUtils;
