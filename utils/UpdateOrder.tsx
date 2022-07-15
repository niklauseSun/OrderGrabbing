import {Modal, Toast} from '@ant-design/react-native';
import {order} from '../api';

const UpdateOrder = {
  GetStore: (orderId: string) => {
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
                Toast.info('确认到店成功');
              }
            });
        },
      },
    ]);
  },
  confirmGetFromStore: (orderId: string) => {
    Modal.alert('确认取货', '确定已从门店取货', [
      {text: '取消', onPress: () => console.log('cancel')},
      {
        text: '确认',
        onPress: () => {
          order
            .updateOrder({
              deliveryOrderId: orderId,
              operateStatus: 2,
            })
            .then(res => {
              if (res.success) {
                Toast.info('确认取货成功');
              }
            });
        },
      },
    ]);
  },
  deliverySuccess: (orderId: string) => {
    Modal.alert('确认送达', '确定已经送达', [
      {text: '取消', onPress: () => console.log('cancel')},
      {
        text: '确认',
        onPress: () => {
          order
            .updateOrder({
              deliveryOrderId: orderId,
              operateStatus: 4,
            })
            .then(res => {
              if (res.success) {
                Toast.info('确认送达成功');
              }
            });
        },
      },
    ]);
  },
  trasferOrder: (orderId: string, reason: string) => {
    order
      .updateOrder({
        deliveryOrderId: orderId,
        operateStatus: 0,
        reason: reason,
      })
      .then(res => {
        if (res.success) {
          Toast.info('已申请转单！');
        }
      });
  },
};

export default UpdateOrder;