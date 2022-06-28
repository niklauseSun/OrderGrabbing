import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {OrderCardProps} from '../../interfaces/locationsProps';
import GrabOrder from '../GrabOrder';

interface CardActionsInterface {
  order: OrderCardProps;
  type: string | 'wait' | 'waitStore' | 'waitPackage' | 'delivery';
  confirmType: string;
}

const CardActions = (props: CardActionsInterface) => {
  const {type} = props;

  const confirmType = props.confirmType || 'photo';
  // type
  // wait: 待抢单 waitStore: 待到店
  // waitPackage 待取货
  // delivery 送货中
  // finish 已完成
  return (
    <View style={styles.bottomView}>
      {type === 'wait' && <GrabOrder order={props.order} />}
      {type === 'waitStore' && (
        <View style={styles.buttonViews}>
          <TouchableOpacity activeOpacity={0.7} style={styles.bottomCancel}>
            <Text style={styles.bottomCancelTitle}>取消转单</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.bottomConfirm}>
            <Text style={styles.buttomButtonTitle}>确认到点</Text>
          </TouchableOpacity>
        </View>
      )}
      {type === 'waitPackage' && (
        <TouchableOpacity activeOpacity={0.7} style={styles.bottomButton}>
          <Text style={styles.buttomButtonTitle}>确认取件</Text>
        </TouchableOpacity>
      )}
      {type === 'delivery' && (
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
      {type === 'waitStore' && (
        <View style={styles.actionsView}>
          <TouchableOpacity activeOpacity={0.7} style={styles.actionButton}>
            <Text>联系电话</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.actionButton}>
            <Text>导航</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.actionButton}>
            <Text>立即转单</Text>
          </TouchableOpacity>
        </View>
      )}
      {type !== 'waitStore' && type !== 'wait' && (
        <View style={styles.actionsView}>
          <TouchableOpacity activeOpacity={0.7} style={styles.actionButton}>
            <Text>联系电话</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.actionButton}>
            <Text>导航</Text>
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
});

export default CardActions;
