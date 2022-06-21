import {Modal} from '@ant-design/react-native';

const Identify = () => {
  const identifyStatus = 'identifyFail'; // 'identifySuccess' || 'identifyFail' || identifing
  console.log('ff');
  switch (identifyStatus) {
    case 'identifing':
      Modal.alert(
        '认证审核',
        '上传的认证信息还在审核，通过以后可以进行接单。',
        [{text: '确认', onPress: () => console.log('ok')}],
      );
      return fail;
      break;
    case 'unIdentify':
      Modal.alert('未认证', '未认证，请上传信息进行认证。', [
        {text: '取消', onPress: () => console.log('cancel')},
        {text: '确认', onPress: () => console.log('ok')},
      ]);
      return false;
      break;
    case 'identifySuccess':
      // 继续接下来的事情
      return true;
      break;
    case 'identifyFail':
      Modal.alert('认证不通过', '身份证号码错误，请点击“去认证”进行重新认证', [
        {text: '取消', onPress: () => console.log('cancel')},
        {text: '去认证', onPress: () => console.log('ok')},
      ]);
      return false;
      break;
    default:
      break;
  }
};

export default Identify;
