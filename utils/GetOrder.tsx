import {Toast} from '@ant-design/react-native';
import {order} from '../api';
import Identify from './Identify';

interface riderOrderInsertReqDTO {
  deliveryOrderId?: string;
  transferRiderOrderId?: string;
}

const GetOrder = (props: riderOrderInsertReqDTO) => {
  const idStatus = Identify();
  if (!idStatus) {
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
        Toast.info('抢单成功');
      } else {
        Toast.info(message);
      }
    });
};

export default GetOrder;
