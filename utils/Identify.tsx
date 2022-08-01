import {Modal} from '@ant-design/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DeviceEventEmitter} from 'react-native';
import {rider} from '../api';
import ToWebPage from './ToWebPage';

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

const Identify = async (showModal = true) => {
  const res = await rider.getRiderInfo();
  console.log('res', res);
  if (res.code === 100) {
    return {
      isLogin: false,
    };
  }
  const {result} = res;
  const {infoStatus, status, mobilePhone} = result;

  if (mobilePhone) {
    AsyncStorage.setItem('mobilePhone', mobilePhone);
  }
  switch (infoStatus) {
    case IdentifyStatus.identifing:
      showModal &&
        Modal.alert(
          '认证审核',
          '上传的认证信息还在审核，通过以后可以进行接单。',
          [{text: '确认', onPress: () => console.log('ok')}],
        );
      return {
        infoStatus,
        status,
        success: false,
        isLogin: true,
      };
    case IdentifyStatus.unIdentify:
      showModal &&
        Modal.alert('未认证', '未认证，请上传信息进行认证。', [
          {text: '取消', onPress: () => console.log('cancel')},
          {
            text: '确认',
            onPress: () => {
              ToWebPage(
                'https://rider-test-app.zhuopaikeji.com/pages/realName/index',
              );
            },
          },
        ]);
      return {
        infoStatus,
        status,
        success: false,
        isLogin: true,
      };
    case IdentifyStatus.identifySuccess:
      // 继续接下来的事情

      if (status === '10100010') {
        showModal &&
          Modal.alert(
            '休息中',
            '当前状态无法进行抢单，请点击“切换”，修改骑手状态',
            [
              {text: '取消', onPress: () => console.log('cancel')},
              {
                text: '切换',
                onPress: () => {
                  rider
                    .switchUserStatus({
                      status: '10100005',
                    })
                    .then(obj => {
                      console.log('res', obj);

                      DeviceEventEmitter.emit('refreshStatus');
                    });
                },
              },
            ],
          );
        return {
          infoStatus,
          status,
          success: false,
          isLogin: true,
        };
      }
      return {
        infoStatus,
        status,
        success: true,
        isLogin: true,
      };
    case IdentifyStatus.identifyFail:
      showModal &&
        Modal.alert(
          '认证不通过',
          '身份证号码错误，请点击“去认证”进行重新认证',
          [
            {text: '取消', onPress: () => console.log('cancel')},
            {
              text: '去认证',
              onPress: () => {
                ToWebPage(
                  'https://rider-test-app.zhuopaikeji.com/pages/realName/index',
                );
              },
            },
          ],
        );
      return {
        infoStatus,
        status,
        success: false,
        isLogin: true,
      };
    default:
      return {
        infoStatus,
        status,
        success: false,
        isLogin: false,
      };
  }
};

export default Identify;
