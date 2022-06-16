import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Clipboard,
} from 'react-native';

const OrderPay = () => {
  const orderNum = '123456789012321';
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.title}>订单收入</Text>
        <Text style={styles.subTitle}>订单细则</Text>
      </View>
      <View style={styles.subInfos}>
        <View style={styles.subHead}>
          <Text style={styles.orderTitle}>订单编号</Text>
        </View>
        <View style={styles.orderInfos}>
          <Text style={styles.orderNum}>{orderNum}</Text>
          <TouchableOpacity
            style={styles.copyButton}
            activeOpacity={0.7}
            onPress={() => {
              Clipboard.setString(orderNum);
            }}>
            <Text style={styles.copyTitle}>复制</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subInfos}>
        <View style={styles.subHead}>
          <Text style={styles.orderTitle}>合计</Text>
        </View>
        <View style={styles.orderInfos}>
          <Text style={styles.orderNum}>￥10.5</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 14,
    marginTop: 10,
    padding: 12,
    borderRadius: 7,
  },
  head: {
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  subTitle: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subInfos: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
  },
  subHead: {
    width: 100,
  },
  orderInfos: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  orderTitle: {
    fontSize: 16,
  },
  orderNum: {
    fontSize: 16,
  },
  copyButton: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 0.5,
    borderColor: '#333',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  copyTitle: {
    fontSize: 14,
  },
});
export default OrderPay;
