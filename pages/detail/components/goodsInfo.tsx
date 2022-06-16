import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';

const GoodsInfo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.title}>商品详情</Text>
      </View>
      <View style={styles.goodInfos}>
        <View style={styles.goodsLineView}>
          <Text style={styles.goodsName}>苹果</Text>
          <Text style={styles.goodsNum}>x1</Text>
          <Text style={styles.goodsPrice}>￥1000</Text>
        </View>
        <View style={styles.goodsLineView}>
          <Text style={styles.goodsName}>苹果</Text>
          <Text style={styles.goodsNum}>x1</Text>
          <Text style={styles.goodsPrice}>￥1000</Text>
        </View>
        <View style={styles.goodsLineView}>
          <Text style={styles.goodsName}>苹果</Text>
          <Text style={styles.goodsNum}>x1</Text>
          <Text style={styles.goodsPrice}>￥1000</Text>
        </View>
      </View>
      <View style={styles.total}>
        <Text style={styles.typeTitle}>品类：水果</Text>
        <Text style={styles.numTitle}>重量：3KG</Text>
      </View>
      <View style={styles.tagView}>
        <Text style={styles.tagTitle}>备注：水果放门口</Text>
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
  },
  title: {
    fontSize: 20,
  },
  goodInfos: {
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
  },
  goodsLineView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  goodsName: {
    width: 100,
    fontSize: 16,
  },
  goodsNum: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
  },
  goodsPrice: {
    width: 100,
    fontSize: 16,
    textAlign: 'right',
  },
  total: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  typeTitle: {
    fontSize: 16,
    marginRight: 100,
  },
  numTitle: {
    fontSize: 16,
  },
  tagView: {
    width: '100%',
    backgroundColor: '#FC5F1029',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  tagTitle: {
    fontSize: 14,
    color: '#333333',
  },
});
export default GoodsInfo;
