import {Toast} from '@ant-design/react-native';
import {order} from '../api';
import Identify from './Identify';

interface riderOrderInsertReqDTO {
  deliveryOrderId?: string;
  transferRiderOrderId?: string;
  callBack?: Function;
}

const GetOrder = async (props: riderOrderInsertReqDTO) => {
  const {success: su} = await Identify();
  if (!su) {
    return;
  }

  order
    .grabOrder({
      deliveryOrderId: props.deliveryOrderId,
      transferRiderOrderId: props.transferRiderOrderId,
    })
    .then(res => {
      console.log('grabOrder', res);
      if (props.callBack) {
        props.callBack(res);
      }
      const {success, message} = res;
      if (success) {
        Toast.info({
          content: '抢单成功',
        });
      } else {
        Toast.info({
          content: message,
        });
      }
    });
};

export default GetOrder;
