import {Modal, Toast} from '@ant-design/react-native';
import {order} from '../api';

const CancelOrder = (orderId: string) => {
  Modal.alert('取消订单', '确定要取消订单吗，取消后不可恢复该订单。', [
    {text: '取消', onPress: () => console.log('cancel')},
    {
      text: '确认',
      onPress: () => {
        order
          .updateOrder({
            deliveryOrderId: orderId,
            operateStatus: 3,
          })
          .then(res => {
            if (res.success) {
              Toast.info('订单已取消');
            }
          });
      },
    },
  ]);
};

export default CancelOrder;
