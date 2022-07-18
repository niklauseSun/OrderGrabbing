export interface LocationInfoProps {
  address: string;
  name: string;
  phone: string;
  regionCode: string;
  storeName?: string | undefined;
  longitude: number;
  latitude: number;
}

export interface OrderCardProps {
  collectOrderPicture: boolean;
  receiveOrderPicture: boolean;
  sourceLogo?: string;
  remainArriveTime?: string | number; // 预计多少分钟
  payAmount?: number; // 价格
  receiveMessage: LocationInfoProps;
  sendMessage: LocationInfoProps;
  riderToSendAddressDistance?: string;
  sendToReceiveAddressDistance?: string;
  echoButton?: number;
  goodsCategoryName?: string;
  commission?: number;
  remark?: string;
  orderNo?: string;
  id?: string;
  status?: string;
}

export interface OrderProps {
  order: OrderCardProps;
}
