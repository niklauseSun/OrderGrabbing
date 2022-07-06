import {Modal, Toast} from '@ant-design/react-native';
import {order} from '../api';
const CancelTransferOrder = orderId => {
  Modal.alert('取消转单', '确定要取消转单操作吗？', [
    {text: '取消', onPress: () => console.log('cancel')},
    {
      text: '确认',
      onPress: () => {
        order
          .updateOrder({
            deliveryOrderId: orderId,
            operateStatus: 5,
          })
          .then(res => {
            if (res.success) {
              Toast.info('取消转单成功');
            }
          });
      },
    },
  ]);
};

export default CancelTransferOrder;
