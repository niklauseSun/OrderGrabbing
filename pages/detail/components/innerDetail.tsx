import React, {useState, useEffect} from 'react';
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
  const [bottom, setBottom] = useState(false);
  const [timeOutFlag, setTimeOutFlag] = useState(false);
  const [textStatus, setTextStatus] = useState('');
  let timeOutId:any = null;
  const countdown = () => {
      setTimeOutFlag(false);
      // setTimeout(() => {
      const date:any = new Date();
      let completeDate:any = null;
      let textStatus:any = '';
      // const futureArriveStoreTime = '2022-06-08 23:40:20';
      // const futureArriveTime = '2022-06-08 23:50:20';
      if (orderDetail.status === '10000005') {
          textStatus = '到店';
          completeDate = new Date(Date.parse(orderDetail.futureArriveStoreTime.replace(/-/g, '/')));
          // completeDate = new Date(Date.parse(futureArriveStoreTime));
      } else if (orderDetail.status === '10000010' && orderDetail.takeGoodsLastTime) {
          textStatus = '取货';
          completeDate = new Date(Date.parse(orderDetail.takeGoodsLastTime.replace(/-/g, '/')));
          // completeDate = new Date(Date.parse(futureArriveTime));
      } else if (orderDetail.status === '10000015') {
          textStatus = '送达';
          completeDate = new Date(Date.parse(orderDetail.futureArriveTime.replace(/-/g, '/')));
      }
      if (completeDate) {
          const diffDate:any = (completeDate - date)/1000/60/60; // 获取小时（带小数点）
          if (diffDate > 0) {
              const hour = Math.floor(diffDate); // 获取小时整数
              let diffSecond:number = 0; // 分钟（带小数点）
              let second:number = 0; // 分钟整数
              let minute:number = 0; // 秒钟
              if (hour >= 1) {
                  diffSecond = (diffDate - hour)*60;
                  second = Math.floor(diffSecond);
                  if (second > 1) {
                      minute = (diffSecond-second)*60;
                  } else {
                      minute = diffSecond*60;
                  }
              } else {
                  diffSecond = diffDate * 60;
                  second = Math.floor(diffSecond);
                  if (second > 1) {
                      minute = (diffSecond-second)*60;
                  } else {
                      minute = diffSecond*60;
                  }
              }
              timeBackward(hour, second, minute, textStatus);
          } else {
              setTimeOutFlag(true);
              clearTimeout(timeOutId);
              setTextStatus(textStatus + '超时');
          }
      }
      // }, 1000)
  }
  const timeBackward = (hour, second, minute, textStatus) => {
      const that = this;
      const hourStr = hour >= 1 && hour < 10 ? `0${hour}` : `${hour}`;
      const secondStr = second >= 0 && second < 10 ? `0${second}` : `${second}`;
      const minuteStr = minute >= 0 && minute < 10 ? `0${minute}` : `${minute}`;
      const dateNow = hour >= 1 ? `${hourStr}:${secondStr}:${minuteStr}` : `${secondStr}:${minuteStr}`;
      setTextStatus(`剩余${dateNow}秒${textStatus}`);
      if (minute === 0 && second === 0 && hour === 0) {
          setTextStatus(textStatus + '超时');
          setTimeOutFlag(true);
      } else {
          setTimeOutFlag(false);
          backward();
      }
      function backward () {
          timeOutId = setTimeout(() => {
              let min = minute;
              let sec = second;
              let hou = hour;
              if (minute === 0 && second === 0 && hour === 0) {
                  timeBackward(0, 0, 0, textStatus);
              } else {
                  setTimeOutFlag(false);
                  if (second === 0) {
                      if (hour > 0) {
                          hou = hour - 1;
                      }
                  }
                  if (minute === 0) {
                      sec = second - 1;
                      min = 59;
                  } else {
                      min = minute - 1;
                  }
                  timeBackward(hou, sec, min, textStatus);
              }
          }, 1000)
      }
  }
  useEffect(() => {
    countdown();
  }, []);
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
