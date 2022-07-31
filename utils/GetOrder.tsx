import {Toast} from '@ant-design/react-native';
import {order} from '../api';
import Identify from './Identify';

interface riderOrderInsertReqDTO {
  deliveryOrderId?: string;
  transferRiderOrderId?: string;
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
      const {success, message} = res;
      if (success) {
        Toast.info({
          content: '抢单成功',
          duration: 1,
        });
      } else {
        Toast.info({
          content: message,
          duration: 1,
        });
      }
    });
};

export default GetOrder;
