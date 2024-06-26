import {query, request} from './ajax';

interface GrapProps {
  pageSize?: number;
  id?: string;
  hideToast?: boolean;
}

interface deliveryProps {
  pageSize?: number;
  pageIndex?: number;
  tab: number;
  hideToast?: boolean;
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
  updateOrder: async (params: any) => {
    let url = '/api/rider/order/update-rider-order-status';
    return request(url, params);
  },
  getOrderDetail: async (id: string) => {
    let url = '/api/delivery-order/query-delivery-order-app-detail?id=' + id;
    return query(url);
  },
  getTransferOrder: async (params: any) => {
    let url = '/api/rider/order/receive-rider-order';
    return request(url, params);
  },
};

export default order;
