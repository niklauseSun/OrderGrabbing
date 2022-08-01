import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import CardActions from '../../../components/CardActions';
import LocationInfo from '../../../components/LocationInfo';
import ToDetail from '../../../utils/ToDetail';

interface LocationInfoProps {
  address: string;
  name: string;
  phone: string;
  regionCode: string;
  storeName: string | undefined;
  longitude: number;
  latitude: number;
}
interface OrderCardProps {
  sourceLogo?: string;
  remainArriveTime: string | number; // 预计多少分钟
  payAmount: number; // 价格
  receiveMessage: LocationInfoProps;
  sendMessage: LocationInfoProps;
  riderToSendAddressDistance: string;
  sendToReceiveAddressDistance: string;
  echoButton: number;
  goodsCategoryName: string;
  commission: number;
  remark?: string;
  orderNo: string;
  status: string;
  id: string;
  collectOrderPicture: boolean;
  receiveOrderPicture: boolean;
}

interface OrderProps {
  order: OrderCardProps;
  type: string | 'waitGrab' | 'waitPackage' | 'delivery';
}

const OrderCard = (props: OrderProps) => {
  return (
    <View style={styles.card}>
      <Pressable
        onPress={() => {
          ToDetail(props.order.id);
        }}>
        <View style={styles.cardHead}>
          <Image
            style={styles.cardHeadIcon}
            source={{uri: props.order.sourceLogo}}
          />
          <Text style={styles.cardHeadInfoText}>
            预计{props.order.remainArriveTime}分钟送到
          </Text>
          <Text style={styles.cardHeadPriceText}>
            ￥{props.order.payAmount}
          </Text>
        </View>
        <LocationInfo
          riderToSendAddressDistance={props.order.riderToSendAddressDistance}
          sendToReceiveAddressDistance={
            props.order.sendToReceiveAddressDistance
          }
          receiveMessage={props.order.receiveMessage}
          sendMessage={props.order.sendMessage}
          status={props.order.status}
        />
        <View style={styles.tagView}>
          <View style={styles.tag}>
            <Text style={styles.tagTitle}>{props.order.goodsCategoryName}</Text>
          </View>
        </View>
        {props.order.remark !== '' && (
          <View style={styles.orangeTag}>
            <Text style={styles.orangeTagTitle}>备注：{}</Text>
          </View>
        )}
        <CardActions
          order={props.order}
          confirmType={'photo'}
          pageType={'list'}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: '#fff',
    paddingTop: 10,
    borderRadius: 7,
  },
  cardHead: {
    height: 40,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardHeadIcon: {
    width: 21,
    height: 21,
    borderRadius: 5,
    backgroundColor: '#e3e3e3',
    marginLeft: 15,
    marginRight: 9,
  },
  cardHeadInfoText: {
    display: 'flex',
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  cardHeadPriceText: {
    marginRight: 15,
    fontSize: 20,
    color: '#FC5F10',
  },
  tagView: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  tag: {
    height: 22,
    borderRadius: 5,
    borderColor: '#FC9E00',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  tagTitle: {
    color: '#FC9E00',
    fontSize: 13,
  },
  orangeTag: {
    backgroundColor: '#FC5F1029',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    marginHorizontal: 15,
    marginTop: 5,
  },
  orangeTagTitle: {
    fontSize: 14,
    color: '#333333',
  },
});

export default OrderCard;
