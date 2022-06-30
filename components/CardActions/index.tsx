import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';
import {OrderCardProps} from '../../interfaces/locationsProps';
import CancelOrder from '../../utils/CancelOrder';
import UpdateOrder from '../../utils/UpdateOrder';
import GrabOrder from '../GrabOrder';

interface CardActionsInterface {
  order: OrderCardProps;
  confirmType: string;
}

const CardActions = (props: CardActionsInterface) => {
  const {status} = props.order;

  const confirmType = props.confirmType || 'photo';
  // type
  // wait: 待抢单 waitStore: 待到店
  // waitPackage 待取货
  // delivery 送货中
  // finish 已完成

  // 待调度 10000000
  // 待到店 10000005
  // 待取货 10000010
  // 配送中 10000015
  // 已送达 10000020
  // 已取消 10000025
  const cancelOrder = () => {
    CancelOrder(props.order.id as string);
  };

  const confirmToStore = () => {
    UpdateOrder.GetStore(props.order.id as string);
  };

  const confirmGetOrderFromStore = () => {
    UpdateOrder.confirmGetFromStore(props.order.id as string);
  };

  return (
    <View style={styles.bottomView}>
      {status === '10000000' && <GrabOrder order={props.order} />}
      {status === '10000005' && (
        <View style={styles.buttonViews}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.bottomCancel}
            onPress={() => {
              cancelOrder();
            }}>
            <Text style={styles.bottomCancelTitle}>取消订单</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.bottomConfirm}
            onPress={() => {
              confirmToStore();
            }}>
            <Text style={styles.buttomButtonTitle}>确认到店</Text>
          </TouchableOpacity>
        </View>
      )}
      {status === '10000010' && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.bottomButton}
          onPress={() => {
            confirmGetOrderFromStore();
          }}>
          <Text style={styles.buttomButtonTitle}>确认取件</Text>
        </TouchableOpacity>
      )}
      {status === '10000015' && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.bottomButton}
          onPress={() => {
            confirmGetOrderFromStore();
          }}>
          <Text style={styles.buttomButtonTitle}>确认送达</Text>
        </TouchableOpacity>
      )}
      {status === 'delivery' && (
        <TouchableOpacity activeOpacity={0.7} style={styles.bottomButton}>
          <Text style={styles.buttomButtonTitle}>
            {confirmType !== 'photo' ? '确认完成' : '拍照完成'}
          </Text>
        </TouchableOpacity>
      )}
      {/* <TouchableOpacity activeOpacity={0.7} style={styles.bottomButton}>
          <Text style={styles.buttomButtonTitle}>取消转单</Text>
        </TouchableOpacity> */}
      <View style={styles.line} />
      {status === '10000005' && (
        <View style={styles.actionsView}>
          <TouchableOpacity activeOpacity={0.7} style={styles.actionButton}>
            <Image
              style={styles.actionIcon}
              source={require('../assets/icon_phone.png')}
            />
            <Text style={styles.actionTitle}>联系电话</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.actionButton}>
            <Image
              style={styles.actionIcon}
              source={require('../assets/icon_location.png')}
            />
            <Text style={styles.actionTitle}>导航</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.actionButton}>
            <Image
              style={styles.actionIcon}
              source={require('../assets/icon_transfer.png')}
            />
            <Text style={styles.actionTitle}>立即转单</Text>
          </TouchableOpacity>
        </View>
      )}
      {(status === '10000010' || status === '10000015') && (
        <View style={styles.actionsView}>
          <TouchableOpacity activeOpacity={0.7} style={styles.actionButton}>
            <Image
              style={styles.actionIcon}
              source={require('../assets/icon_phone.png')}
            />
            <Text style={styles.actionTitle}>联系电话</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.actionButton}>
            <Image
              style={styles.actionIcon}
              source={require('../assets/icon_location.png')}
            />
            <Text style={styles.actionTitle}>导航</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomView: {
    width: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
  },
  buttonViews: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 21,
    marginBottom: 12,
  },
  bottomCancel: {
    width: 153,
    height: 44,
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: '#F6F6F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomCancelTitle: {
    fontSize: 16,
    color: '#333333',
  },
  bottomConfirm: {
    backgroundColor: '#1677FE',
    borderRadius: 10,
    width: 153,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButton: {
    backgroundColor: '#1677FE',
    borderRadius: 10,
    width: 321,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    marginTop: 21,
  },
  line: {
    height: 1,
    width: '100%',
  },
  buttomButtonTitle: {
    fontSize: 16,
    color: '#fff',
  },
  actionsView: {
    height: 67,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  actionButton: {
    width: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailInfos: {
    height: 500,
    width: '100%',
    backgroundColor: 'blue',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  actionIcon: {
    width: 18,
    height: 18,
  },
  actionTitle: {
    fontSize: 12,
    marginTop: 6,
  },
});

export default CardActions;
