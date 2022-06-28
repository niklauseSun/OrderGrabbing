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
      riderOrderInsertReqDTO: {
        deliveryOrderId: props.deliveryOrderId,
        transferRiderOrderId: props.transferRiderOrderId,
      },
    })
    .then(res => {
      console.log('grabOrder', res);
    });
};

export default GetOrder;
