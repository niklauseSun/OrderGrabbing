import {Modal} from '@ant-design/react-native';
import {rider} from '../api';

export const IdentifyStatus = {
  identifing: '10150005',
  unIdentify: '10150000',
  identifySuccess: '10150010',
  identifyFail: '10150015',
};

export const onlineInfo = {
  onLine: '10100005',
  offline: '10100010',
};

const Identify = async () => {
  const res = await rider.getRiderInfo();
  console.log('res', res);
  const {result} = res;
  const {infoStatus, status} = result;
  // rider.getRiderInfo().then(res => {
  //   console.log('fff', res);
  //   const {result} = res;
  //   // 去认证 跳转

  //   if (result.infoStatus === '10150000') {
  //     Identify(IdentifyStatus.unIdentify);
  //   }
  // });
  // const identifyStatus = 'identifyFail'; // 'identifySuccess' || 'identifyFail' || identifing
  switch (infoStatus) {
    case IdentifyStatus.identifing:
      Modal.alert(
        '认证审核',
        '上传的认证信息还在审核，通过以后可以进行接单。',
        [{text: '确认', onPress: () => console.log('ok')}],
      );
      return {
        infoStatus,
        status,
      };
    case IdentifyStatus.unIdentify:
      Modal.alert('未认证', '未认证，请上传信息进行认证。', [
        {text: '取消', onPress: () => console.log('cancel')},
        {text: '确认', onPress: () => console.log('ok')},
      ]);
      return {
        infoStatus,
        status,
      };
    case IdentifyStatus.identifySuccess:
      // 继续接下来的事情
      return {
        infoStatus,
        status,
      };
    case IdentifyStatus.identifyFail:
      Modal.alert('认证不通过', '身份证号码错误，请点击“去认证”进行重新认证', [
        {text: '取消', onPress: () => console.log('cancel')},
        {text: '去认证', onPress: () => console.log('ok')},
      ]);
      return {
        infoStatus,
        status,
      };
    default:
      break;
  }
};

export default Identify;
