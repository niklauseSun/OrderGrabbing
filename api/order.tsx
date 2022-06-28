import {query, request} from './ajax';

interface GrapProps {
  pageSize?: number;
  id?: string;
}

interface deliveryProps {
  pageSize?: number;
  pageIndex?: number;
  tab: number;
}

const order = {
  queryWaitGrab: async ({pageSize = 10, id = ''}: GrapProps) => {
    let url = `/api/delivery-order/page-wait-grab-delivery-order?id=${id}&pageSize=${pageSize}`;
    return query(url);
  },
  queryWaitPackage: async ({
    pageIndex = 1,
    pageSize = 10,
    tab = 1,
  }: deliveryProps) => {
    let url = `/api/delivery-order/page-pick-up-or-wait-delivery-order?pageNo=${pageIndex}&pageSize=${pageSize}&tab=${tab}`;
    return query(url);
  },
  grabOrder: async (params: any) => {
    let url = '/api/rider/order/immediate-grab-order';
    return request(url, params);
  },
};

export default order;
