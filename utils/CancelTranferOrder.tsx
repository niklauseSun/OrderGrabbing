import {Modal} from '@ant-design/react-native';
const CancelTransferOrder = () => {
  Modal.alert('取消转单', '确定要取消转单操作吗？', [
    {text: '取消', onPress: () => console.log('cancel')},
    {text: '确认', onPress: () => console.log('ok')},
  ]);
};

export default CancelTransferOrder;
