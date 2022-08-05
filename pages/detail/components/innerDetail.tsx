import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  LayoutAnimation,
  ScrollView,
  Image,
} from 'react-native';
import LocationInfo from '../../../components/LocationInfo';

import GoodsInfo from './goodsInfo';
import OrderInfo from './orderInfo';
import OrderPay from './orderPay';
import TakePic from './takePic';
import {OrderDetailProps} from '../../../interfaces/OrderDetailProps';
interface InnerDetailProps {
  orderDetail: OrderDetailProps;
}
const InnerDetail = (props: InnerDetailProps) => {
  const {orderDetail} = props;
  const [bottom, setBottom] = useState(true);
  return (
    <View
      style={[
        styles.contaner,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          height: bottom ? 500 : 30,
        },
      ]}>
      <View style={styles.top}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.topTapButton}
          onPress={() => {
            setBottom(!bottom);
            LayoutAnimation.Presets.easeInEaseOut;
          }}>
          <View style={styles.topTap} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.orderStatus}>
            {/* <View style={styles.orderNumView}>
            <Image
              source={{uri: orderDetail.sourceLogo}}
              style={styles.orderNumIcon}
            />
            <Text style={styles.orderNumText}>{orderDetail.seq}</Text>
          </View> */}
            {(orderDetail.status === '10000005' ||
              orderDetail.status === '10000010' ||
              orderDetail.status === '10000015') &&
              orderDetail.echoButton !== 2 && (
                <View style={styles.orderNumView}>
                  <Image
                    source={{uri: orderDetail.sourceLogo}}
                    style={styles.orderNumIcon}
                  />
                  <Text style={styles.orderNumText}>{orderDetail.seq}</Text>
                </View>
              )}

            {orderDetail.status !== '10000005' &&
              orderDetail.status !== '10000010' &&
              orderDetail.status !== '10000015' && (
                <View style={styles.orderNumViewWhite}>
                  <Image
                    source={{uri: orderDetail.sourceLogo}}
                    style={styles.orderNumIcon}
                  />
                </View>
              )}
            {getOderText(orderDetail.status as string)}
          </View>
          <View style={styles.topLine} />
          <View style={styles.cardHead}>
            <Image
              style={styles.cardHeadIcon}
              source={require('./assets/icon_time.png')}
            />
            <Text style={styles.cardHeadInfoText}>
              预计{orderDetail.remainArriveTime}分钟送到
            </Text>
            <Text style={styles.cardHeadPriceText}>
              ￥{orderDetail.payAmount}
            </Text>
          </View>
          <LocationInfo
            receiveMessage={orderDetail.receiveMessage}
            sendMessage={orderDetail.sendMessage}
            riderToSendAddressDistance={orderDetail.riderToSendAddressDistance}
            sendToReceiveAddressDistance={
              orderDetail.sendToReceiveAddressDistance
            }
            status={orderDetail.status}
            echoButton={orderDetail.echoButton}
          />
        </View>

        <GoodsInfo
          orderGoodsInfos={orderDetail.deliveryOrderGoodsDataDTO}
          remark={orderDetail.remark}
          goodsCategory={orderDetail.goodsCategory}
          totalWeight={orderDetail.totalWeight}
        />
        <OrderInfo
          orderId={orderDetail.orderNo}
          orderTime={orderDetail.orderDate}
        />
        <OrderPay totalAmount={orderDetail.totalAmount} />

        {(orderDetail.collectOrderPicture ||
          orderDetail.receiveOrderPicture) && (
          <TakePic orderDetail={orderDetail} />
        )}
      </ScrollView>
    </View>
  );
};

const getOderText = (status: string) => {
  return (
    <View style={styles.orderStatusTag}>
      {status === '10000000' && (
        <Text style={styles.orderStatusTagText}>待调度</Text>
      )}
      {status === '10000005' && (
        <Text style={styles.orderStatusTagText}>待到店</Text>
      )}
      {status === '10000010' && (
        <Text style={styles.orderStatusTagText}>待取货</Text>
      )}
      {status === '10000015' && (
        <Text style={styles.orderStatusTagText}>配送中</Text>
      )}
      {status === '10000020' && (
        <Text style={styles.orderStatusTagText}>已送达</Text>
      )}
      {status === '10000025' && (
        <Text style={styles.orderStatusTagText}>已取消</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contaner: {
    height: 500,
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: 'hidden',
  },

  top: {
    height: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTapButton: {
    width: 120,
    height: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTap: {
    width: 56,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#E4E4E4',
  },
  header: {
    marginHorizontal: 15,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  orderStatus: {
    height: 70,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topLine: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 10,
  },
  orderNumView: {
    paddingHorizontal: 12,
    height: 38,
    backgroundColor: '#F6F6F6',
    borderTopRightRadius: 19,
    borderBottomRightRadius: 19,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderNumViewWhite: {
    paddingHorizontal: 12,
    height: 38,
    backgroundColor: '#fff',
    borderTopRightRadius: 19,
    borderBottomRightRadius: 19,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderNumIcon: {
    width: 23,
    height: 23,
    backgroundColor: '#D8D8D8',
    borderRadius: 4,
  },
  orderNumText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  orderStatusTag: {
    display: 'flex',
    flex: 1,
  },
  orderStatusTagText: {
    textAlign: 'right',
    marginRight: 15,
    fontSize: 20,
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
    marginLeft: 15,
    marginRight: 9,
  },
  cardHeadInfoText: {
    display: 'flex',
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  cardHeadPriceText: {
    marginRight: 15,
    fontSize: 20,
    color: '#FC5F10',
  },
});
export default InnerDetail;
