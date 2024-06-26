import {Modal, Toast} from '@ant-design/react-native';
import {order} from '../api';
import Identify from './Identify';

const UpdateOrder = {
  GetStore: async (orderId: string, callBack?: Function) => {
    const {success} = await Identify();
    success &&
      Modal.alert('确认到店', '确定已到达取货门店', [
        {text: '取消', onPress: () => console.log('cancel')},
        {
          text: '确认',
          onPress: () => {
            order
              .updateOrder({
                deliveryOrderId: orderId,
                operateStatus: 1,
              })
              .then(res => {
                if (res.success) {
                  Toast.info({
                    content: '确认到店成功',
                  });
                  if (callBack) {
                    callBack(res);
                  }
                }
              });
          },
        },
      ]);
  },
  confirmGetFromStore: async (
    orderId: string,
    resultUrl?,
    callBack?: Function,
  ) => {
    // const {success} = await Identify();
    // success &&
    Modal.alert('确认取货', '确定已从门店取货', [
      {text: '取消', onPress: () => console.log('cancel')},
      {
        text: '确认',
        onPress: () => {
          order
            .updateOrder({
              deliveryOrderId: orderId,
              operateStatus: 2,
              pickUpOrderPhotoUrl: resultUrl,
            })
            .then(res => {
              if (res.success) {
                Toast.info({
                  content: '确认取货成功',
                });
              } else {
                Toast.info({
                  content: res.message,
                });
              }
              if (callBack) {
                callBack(res);
              }
            });
        },
      },
    ]);
  },
  deliverySuccess: async (
    orderId: string,
    resultUrl?: string,
    callBack?: Function,
  ) => {
    const {success} = await Identify();
    success &&
      Modal.alert('确认送达', '确定已经送达', [
        {text: '取消', onPress: () => console.log('cancel')},
        {
          text: '确认',
          onPress: () => {
            order
              .updateOrder({
                deliveryOrderId: orderId,
                operateStatus: 4,
                receiveOrderPhotoUrl: resultUrl,
              })
              .then(res => {
                if (res.success) {
                  Toast.info({
                    content: '确认送达成功',
                  });
                }

                if (callBack) {
                  callBack(res);
                }
              });
          },
        },
      ]);
  },
  trasferOrder: async (orderId: string, reason: string, callBack: Function) => {
    const {success} = await Identify();
    success &&
      order
        .updateOrder({
          deliveryOrderId: orderId,
          operateStatus: 0,
          reason: reason,
        })
        .then(res => {
          if (res.success) {
            Toast.info({
              content: '已申请转单！',
            });
          }
          if (callBack) {
            callBack(res);
          }
        });
  },
};

export default UpdateOrder;
