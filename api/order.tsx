import {query} from './ajax';

interface GrapProps {
  pageSize?: number;
  id?: string;
}

const order = {
  queryWaitGrab: async ({pageSize = 10, id = ''}: GrapProps) => {
    let url = `/api/delivery-order/page-wait-grab-delivery-order?id=${id}&pageSize=${pageSize}`;
    return query(url);
  },
};

export default order;
