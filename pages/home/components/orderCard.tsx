import React, { useState, useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

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
  remainArriveTime: string | number; // 预计多少分钟
  sourceLogo?: string;
  takeGoodsLastTime?: string | undefined;
  futureArriveTime?: string | undefined;
  futureArriveStoreTime?: string | undefined;
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
  tabIndex: number;
}

const OrderCard = (props: OrderProps) => {
  const { order } = props;
  const [timeOutFlag, setTimeOutFlag] = useState(false);
  const [textStatus, setTextStatus] = useState('');
  let timeOutId: any = null;
  const countdown = () => {
    setTimeOutFlag(false);
    // setTimeout(() => {
    const date: any = new Date();
    let completeDate: any = null;
    let textStatus: any = '';
    // const futureArriveStoreTime = '2022-06-08 23:40:20';
    // const futureArriveTime = '2022-06-08 23:50:20';
    if (order.status === '10000005') {
      textStatus = '到店';
      completeDate = new Date(Date.parse(order.futureArriveStoreTime.replace(/-/g, '/')));
      // completeDate = new Date(Date.parse(futureArriveStoreTime));
    } else if (order.status === '10000010' && order.takeGoodsLastTime) {
      textStatus = '取货';
      completeDate = new Date(Date.parse(order.takeGoodsLastTime.replace(/-/g, '/')));
      // completeDate = new Date(Date.parse(futureArriveTime));
    } else if (order.status === '10000015') {
      textStatus = '送达';
      completeDate = new Date(Date.parse(order.futureArriveTime.replace(/-/g, '/')));
    }
    if (completeDate) {
      const diffDate: any = (completeDate - date) / 1000 / 60 / 60; // 获取小时（带小数点）
      if (diffDate > 0) {
        const hour = Math.floor(diffDate); // 获取小时整数
        let diffSecond: number = 0; // 分钟（带小数点）
        let second: number = 0; // 分钟整数
        let minute: number = 0; // 秒钟
        if (hour >= 1) {
          diffSecond = (diffDate - hour) * 60;
          second = Math.floor(diffSecond);
          if (second > 1) {
            minute = (diffSecond - second) * 60;
          } else {
            minute = diffSecond * 60;
          }
        } else {
          diffSecond = diffDate * 60;
          second = Math.floor(diffSecond);
          if (second > 1) {
            minute = (diffSecond - second) * 60;
          } else {
            minute = diffSecond * 60;
          }
        }
        timeBackward(hour, second, Math.floor(minute), textStatus);
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
    function backward() {
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
    <View style={styles.card}>
      <Pressable
        onPress={() => {
          ToDetail({
            id: props.order.id,
            tabIndex: props.tabIndex,
          });
        }}>
        <View style={styles.cardHead}>
          <Image
            style={styles.cardHeadIcon}
            source={{uri: props.order.sourceLogo}}
          />
          <Text style={styles.cardHeadInfoText}>
              {props.order.remainArriveTime}分钟内送达
            </Text>
          <Text style={styles.cardHeadPriceText}>
            ￥{props.order.commission}
          </Text>
        </View>
        { /* 展示倒计时*/}
        {order.status === '10000005' ||
          order.status === '10000010' ||
          order.status === '10000015' ? (
          <View style={styles.textNormal}>
            <Text style={timeOutFlag && styles.timeOut}>{textStatus}</Text>
          </View>
        ) : null}
        {/* 以上这段代码为展示倒计时*/}
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
            <Text style={styles.orangeTagTitle}>备注：{ }</Text>
          </View>
        )}
        <CardActions
          order={props.order}
          confirmType={'photo'}
          pageType={'list'}
          tabIndex={props.tabIndex}
        />
      </Pressable>
      {(props.order.echoButton === 2 || props.order.echoButton === 3) && (
        <Image
          style={styles.transferIcon}
          source={require('./assets/icon_transfer.png')}
        />
      )}
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
    justifyContent: 'space-between'
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
    fontSize: 14,
    fontWeight: 'bold',
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
  transferIcon: {
    height: 81,
    width: 64,
    position: 'absolute',
    right: 0,
    top: 50,
  },
  textNormal: {
    fontSize: 14,
    color: '#333333',
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  timeOut: {
    color: 'red',
    textAlign: 'right'
  },
});

export default OrderCard;
