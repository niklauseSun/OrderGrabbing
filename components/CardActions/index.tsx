import {Modal, Toast} from '@ant-design/react-native';
import React, {useState} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {Linking} from 'react-native';
import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';
import {OrderCardProps} from '../../interfaces/locationsProps';
import CancelOrder from '../../utils/CancelOrder';
import CancelTransferOrder from '../../utils/CancelTranferOrder';
import GetOrder from '../../utils/GetOrder';
import IdUtils from '../../utils/IdUtils';
import ToTakePic from '../../utils/ToTakePic';
import UpdateOrder from '../../utils/UpdateOrder';
import GrabOrder from '../GrabOrder';
import TransferOrderModal from './TransferOrderModal';

interface CardActionsInterface {
  order: OrderCardProps;
  confirmType: string;
  pageType: string; // list || detail
  tabIndex?: number;
}

const CardActions = (props: CardActionsInterface) => {
  const {status} = props.order;

  const confirmType = props.confirmType || 'photo';
  const [showPhoneView, setPhoneView] = useState(false);
  const [showTransfer, setTransfer] = useState(false);

  const refreshList = () => {
    console.log('refresh list');
    if (props.pageType === 'detail') {
      DeviceEventEmitter.emit('refreshDetail');
    } else {
      DeviceEventEmitter.emit('refresh', props.tabIndex);
    }
  };
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
    CancelOrder(props.order.id as string, () => {
      refreshList();
    });
  };

  const confirmToStore = () => {
    UpdateOrder.GetStore(props.order.id as string, () => {
      refreshList();
    });
  };

  const confirmGetOrderFromStore = () => {
    UpdateOrder.confirmGetFromStore(props.order.id as string, undefined, () => {
      refreshList();
    });
  };

  const confirmGetOrderWithPic = () => {
    ToTakePic((res: string) => {
      UpdateOrder.confirmGetFromStore(props.order.id as string, res, () => {
        refreshList();
      });
    });
  };

  const confirmSendOrder = () => {
    UpdateOrder.deliverySuccess(props.order.id as string, undefined, () => {
      refreshList();
    });
  };

  const confirmSendOrderWithPic = () => {
    ToTakePic((res: string) => {
      UpdateOrder.deliverySuccess(props.order.id as string, res, () => {
        refreshList();
      });
    });
  };

  const confirmTransferOrder = (reason: string) => {
    console.log('transferReason', reason);
    UpdateOrder.trasferOrder(props.order.id as string, reason, () => {
      refreshList();
    });
  };

  const showPhoneModal = () => {
    console.log('showPhoneModal');
    setPhoneView(true);
  };

  const call = (phone: string) => {
    let tel = 'tel:' + phone; // 目标电话
    Linking.canOpenURL(tel).then(res => {
      if (res) {
        Linking.canOpenURL(tel);
      } else {
        Toast.info({
          content: '无法拨打电话！',
        });
      }
    });
  };

  if (props.order.echoButton === 2) {
    return (
      <View style={styles.bottomView}>
        <GrabOrder
          pageType={props.pageType}
          order={props.order}
          tabIndex={props.tabIndex}
        />
      </View>
    );
  }

  return (
    <View style={styles.bottomView}>
      {status === '10000000' && (
        <GrabOrder
          pageType={props.pageType}
          order={props.order}
          tabIndex={props.tabIndex}
        />
      )}
      {status === '10000005' && props.order.echoButton !== 3 && (
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
      {status === '10000005' && props.order.echoButton === 3 && (
        <View style={styles.buttonViews}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.bottomButton}
            onPress={() => {
              CancelTransferOrder(props.order.id as string);
            }}>
            <Text style={styles.buttomButtonTitle}>取消转单</Text>
          </TouchableOpacity>
        </View>
      )}
      {status === '10000010' && (
        <CollectButton
          collectOrderPicture={props.order.collectOrderPicture}
          confirmGetOrderFromStore={confirmGetOrderFromStore}
          confirmGetOrderWithPic={confirmGetOrderWithPic}
        />
      )}
      {status === '10000015' && (
        <ConfirmButton
          receiveOrderPicture={props.order.receiveOrderPicture}
          confirmSendOrder={confirmSendOrder}
          confirmSendOrderWithPic={confirmSendOrderWithPic}
        />
      )}
      {status === 'delivery' && (
        <TouchableOpacity activeOpacity={0.7} style={styles.bottomButton}>
          <Text style={styles.buttomButtonTitle}>
            {confirmType !== 'photo' ? '确认完成' : '拍照完成'}
          </Text>
        </TouchableOpacity>
      )}
      <View style={styles.line} />
      {status === '10000005' && (
        <View style={styles.actionsView}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.actionButton}
            onPress={() => {
              console.log('fff');
              showPhoneModal();
            }}>
            <Image
              style={styles.actionIcon}
              source={require('../assets/icon_phone.png')}
            />
            <Text style={styles.actionTitle}>联系电话</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (
                props.order.status === '10000000' ||
                props.order.status === '10000005' ||
                props.order.status === '10000010'
              ) {
                IdUtils.toAmap({
                  latitude: props.order.sendMessage.latitude,
                  longitude: props.order.sendMessage.longitude,
                });
              } else {
                IdUtils.toAmap({
                  latitude: props.order.receiveMessage.latitude,
                  longitude: props.order.receiveMessage.longitude,
                });
              }
            }}
            activeOpacity={0.7}
            style={styles.actionButton}>
            <Image
              style={styles.actionIcon}
              source={require('../assets/icon_location.png')}
            />
            <Text style={styles.actionTitle}>导航</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.actionButton}
            onPress={() => {
              setTransfer(true);
            }}>
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
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.actionButton}
            onPress={() => {
              showPhoneModal();
            }}>
            <Image
              style={styles.actionIcon}
              source={require('../assets/icon_phone.png')}
            />
            <Text style={styles.actionTitle}>联系电话</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // 待调度 10000000
              // 待到店 10000005
              // 待取货 10000010

              if (
                props.order.status === '10000000' ||
                props.order.status === '10000005' ||
                props.order.status === '10000010'
              ) {
                IdUtils.toAmap({
                  latitude: props.order.sendMessage.latitude,
                  longitude: props.order.sendMessage.longitude,
                });
              } else {
                IdUtils.toAmap({
                  latitude: props.order.receiveMessage.latitude,
                  longitude: props.order.receiveMessage.longitude,
                });
              }
            }}
            activeOpacity={0.7}
            style={styles.actionButton}>
            <Image
              style={styles.actionIcon}
              source={require('../assets/icon_location.png')}
            />
            <Text style={styles.actionTitle}>导航</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        transparent
        visible={showPhoneView}
        maskClosable
        onClose={() => {
          setPhoneView(false);
        }}>
        <View style={styles.phoneModal}>
          <View style={styles.phoneTitleView}>
            <Text style={styles.phoneTitle}>联系人电话</Text>
          </View>
          <View style={styles.phoneItemView}>
            <View style={styles.phoneItemTitleView}>
              <Text style={styles.phoneItemTitle}>取货人</Text>
            </View>
            <View style={styles.phoneInfos}>
              <Text style={styles.nameText}>
                {props.order.sendMessage.name}
              </Text>
              <Text style={styles.phoneText}>
                {props.order.sendMessage.phone}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.actionButton}
                onPress={() => {
                  call(props.order.sendMessage.phone);
                }}>
                <Image
                  style={styles.actionIcon}
                  source={require('../assets/icon_phone.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.phoneItemTitleView}>
              <Text style={styles.phoneItemTitle}>收货人</Text>
            </View>
            <View style={styles.phoneInfos}>
              <Text style={styles.nameText}>
                {props.order.receiveMessage.name}
              </Text>
              <Text style={styles.phoneText}>
                {props.order.receiveMessage.phone}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.actionButton}
                onPress={() => {
                  call(props.order.receiveMessage.phone);
                }}>
                <Image
                  style={styles.actionIcon}
                  source={require('../assets/icon_phone.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TransferOrderModal
        show={showTransfer}
        setTransferShow={setTransfer}
        confrimTransferOrder={confirmTransferOrder}
      />
    </View>
  );
};

const CollectButton = props => {
  const {
    collectOrderPicture = false,
    confirmGetOrderFromStore,
    confirmGetOrderWithPic,
  } = props;
  if (collectOrderPicture) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.bottomButton}
        onPress={() => {
          confirmGetOrderWithPic();
        }}>
        <Text style={styles.buttomButtonTitle}>拍照取件</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.bottomButton}
      onPress={() => {
        confirmGetOrderFromStore();
      }}>
      <Text style={styles.buttomButtonTitle}>确认取件</Text>
    </TouchableOpacity>
  );
};

const ConfirmButton = (props: any) => {
  const {
    receiveOrderPicture = false,
    confirmSendOrder,
    confirmSendOrderWithPic,
  } = props;
  if (receiveOrderPicture) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.bottomButton}
        onPress={() => {
          confirmSendOrderWithPic();
        }}>
        <Text style={styles.buttomButtonTitle}>拍照完成</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.bottomButton}
      onPress={() => {
        confirmSendOrder();
      }}>
      <Text style={styles.buttomButtonTitle}>确认完成</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bottomView: {
    width: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
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
  phoneModal: {},
  phoneTitleView: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  phoneTitle: {
    fontSize: 16,
  },
  phoneItemView: {
    display: 'flex',
    flexDirection: 'column',
  },
  phoneInfos: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  phoneItemTitleView: {
    marginBottom: 9,
  },
  phoneItemTitle: {
    fontSize: 15,
    color: '#1677FE',
  },
  phoneText: {
    fontSize: 14,
    color: '#333333',
  },
  nameText: {
    width: 60,
  },
});

export default CardActions;
