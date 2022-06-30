/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  LayoutAnimation,
  ScrollView,
} from 'react-native';
import LocationInfo from '../../../components/LocationInfo';

import GoodsInfo from './goodsInfo';
import OrderInfo from './orderInfo';
import OrderPay from './orderPay';
import TakePic from './takePic';
const InnerDetail = ({orderDetail}) => {
  const [bottom, setBottom] = useState(false);
  return (
    <View
      style={[
        styles.contaner,
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
        <View style={styles.orderStatus}>
          <View style={styles.orderNumView}>
            <View style={styles.orderNumIcon} />
            <Text style={styles.orderNumText}>8756</Text>
          </View>
          <View style={styles.orderStatusTag}>
            <Text style={styles.orderStatusTagText}>待抢单</Text>
          </View>
        </View>
        <LocationInfo />

        <GoodsInfo />
        <OrderInfo />
        <OrderPay />
        <TakePic />
      </ScrollView>
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
    backgroundColor: '#fff',
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
  orderStatus: {
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
  orderNumIcon: {
    width: 23,
    height: 23,
    backgroundColor: '#D8D8D8',
    borderRadius: 2,
  },
  orderNumText: {
    fontSize: 22,
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
    fontSize: 22,
  },
});
export default InnerDetail;
