import {LocationInfoProps} from './locationsProps';

export interface OrderGoodsDetailDto {
  goodsAmount: number;
  goodsCode: string;
  goodsName: string;
  goodsPrice: number;
}

export interface OrderPriceDetailDetDTO {
  amount: number;
  name: string;
}

export interface DeliveryOrderDto {
  actualPaidAmount: number;
  deliveryOrderGoodsDetailDTOList: [OrderGoodsDetailDto];
}

export interface DeliveryOrderPriceDataDTO {
  totalAmount: number;
  deliveryOrderPriceDetailDetDTOList: [OrderPriceDetailDetDTO];
}

export interface OrderDetailProps {
  collectOrderPicture?: boolean;
  commission?: number;
  deliveryOrderGoodsDataDTO?: DeliveryOrderDto;
  deliveryOrderPriceDataDTO?: DeliveryOrderPriceDataDTO;
  echoButton?: number;
  goodsCategory?: string;
  id?: string;
  orderDate?: string;
  orderNo?: string;
  payAmount?: string;
  receiveMessage?: LocationInfoProps;
  receiveOrderPicture?: boolean;
  remark?: string;
  riderOrderId?: string;
  riderToSendAddressDistance?: number;
  sendMessage?: LocationInfoProps;
  sendToReceiveAddressDistance?: number;
  seq?: number;
  source?: string;
  sourceLogo?: string;
  status?: string;
  totalAmount?: string;
  totalWeight?: string;
}
