import {Modal} from '@ant-design/react-native';

const CancelOrder = () => {
  Modal.alert('取消订单', '确定要取消订单吗，取消后不可恢复该订单。', [
    {text: '取消', onPress: () => console.log('cancel')},
    {text: '确认', onPress: () => console.log('ok')},
  ]);
};

export default CancelOrder;
