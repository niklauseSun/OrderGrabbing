import _ from 'lodash';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {DeliveryOrderDto} from '../../../interfaces/OrderDetailProps';

interface GoodsInfoProps {
  orderGoodsInfos: DeliveryOrderDto;
  totalWeight?: string;
  goodsCategory?: string;
  remark?: string;
}

const GoodsInfo = (props: GoodsInfoProps) => {
  const {orderGoodsInfos, goodsCategory, totalWeight, remark} = props;
  const {deliveryOrderGoodsDetailDTOList} = orderGoodsInfos;

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.title}>商品详情</Text>
      </View>
      <View style={styles.goodInfos}>
        {deliveryOrderGoodsDetailDTOList.map((item, index) => {
          return (
            <View style={styles.goodsLineView} key={index + ''}>
              <Text style={styles.goodsName}>{item.goodsName}</Text>
              <Text style={styles.goodsNum}>x{item.goodsAmount}</Text>
              <Text style={styles.goodsPrice}>￥{item.goodsPrice}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.total}>
        <Text style={styles.typeTitle}>品类：{goodsCategory}</Text>
        <Text style={styles.numTitle}>重量：{totalWeight}</Text>
      </View>
      <>
        {!_.isEmpty(remark) ? (
          <View style={styles.tagView}>
            <Text style={styles.tagTitle}>{remark}</Text>
          </View>
        ) : null}
      </>
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
