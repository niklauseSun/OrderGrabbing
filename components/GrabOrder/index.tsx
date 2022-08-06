import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  View,
  Image,
  Pressable,
  DeviceEventEmitter,
} from 'react-native';
import {OrderProps} from '../../interfaces/locationsProps';

import LocationInfo from '../LocationInfo';
import Button from '../Button';
import GetOrder, {receiveTransferOrder} from '../../utils/GetOrder';
import _ from 'lodash';
const GrabOrder = (props: OrderProps) => {
  console.log('grabOrder', props.order);
  const {order} = props;
  const [visible, setVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => {
          setVisible(true);
        }}>
        <Text style={styles.buttomButtonTitle}>
          {props.order.echoButton === 2 ? '接受转单' : '立刻抢单'}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={visible}
        animationType="fade"
        transparent
        presentationStyle="overFullScreen"
        onRequestClose={() => {
          setVisible(false);
        }}
        statusBarTranslucent>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalBg}
          onPress={() => {
            console.log('fff');
            setVisible(false);
          }}>
          <Pressable onPress={() => {}}>
            <View style={styles.modalContainer}>
              <View style={styles.cardHead}>
                <Image
                  style={styles.cardHeadIcon}
                  source={{uri: order.sourceLogo}}
                />
                <Text style={styles.cardHeadInfoText}>
                  预计{order.remainArriveTime}分钟送到
                </Text>
                <Text style={styles.cardHeadPriceText}>
                  ￥{order.payAmount}
                </Text>
              </View>
              <LocationInfo
                sendMessage={order.sendMessage}
                receiveMessage={order.receiveMessage}
                riderToSendAddressDistance={order.riderToSendAddressDistance}
                sendToReceiveAddressDistance={
                  order.sendToReceiveAddressDistance
                }
                status={order.status}
              />
              <View style={styles.tagView}>
                <View style={styles.tag}>
                  <Text style={styles.tagTitle}>
                    {order.goodsCategory || order.goodsCategoryName}
                  </Text>
                </View>
              </View>
              {!_.isEmpty(order.remark) && (
                <View style={styles.orangeTag}>
                  <Text style={styles.orangeTagTitle}>
                    备注：{order.remark}
                  </Text>
                </View>
              )}
              <View style={styles.bottomViews}>
                <Button
                  title="取消"
                  onPress={() => {
                    setVisible(false);
                  }}
                />
                <Button
                  title="确认"
                  type="primary"
                  onPress={() => {
                    setVisible(false);
                    console.log('order', order);

                    if (props.order.echoButton === 2) {
                      receiveTransferOrder({
                        deliveryOrderId: order.id,
                        transferRiderOrderId: order.riderOrderId,
                        callBack: () => {
                          if (props.pageType === 'detail') {
                            DeviceEventEmitter.emit('refreshDetail');
                            DeviceEventEmitter.emit('refresh', props.tabIndex);
                          } else {
                            DeviceEventEmitter.emit('refresh', props.tabIndex);
                          }
                        },
                      });
                    } else {
                      GetOrder({
                        deliveryOrderId: order.id,
                        callBack: () => {
                          if (props.pageType === 'detail') {
                            DeviceEventEmitter.emit('refreshDetail');
                            DeviceEventEmitter.emit('refresh', props.tabIndex);
                          } else {
                            DeviceEventEmitter.emit('refresh', props.tabIndex);
                          }
                        },
                      });
                    }
                  }}
                />
              </View>
            </View>
          </Pressable>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
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
  buttomButtonTitle: {
    fontSize: 16,
    color: '#fff',
  },
  modalBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#00000035',
  },
  modalContainer: {
    width: 340,
    height: 300,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
    borderRadius: 5,
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
  bottomViews: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default GrabOrder;
