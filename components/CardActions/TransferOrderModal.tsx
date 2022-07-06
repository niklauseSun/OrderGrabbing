import {Modal} from '@ant-design/react-native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../Button';
interface TransferOrderProps {
  show: boolean;
  setTransferShow: Function;
  confrimTransferOrder: Function;
}
const TransferOrderModal = (props: TransferOrderProps) => {
  const reasonList = ['紧急转单', '抢错订单', '交通以外'];
  const reasonList2 = ['车辆故障', '出餐慢', '订单快超时'];
  const [selectIndex, setSelect] = useState<string[]>([]);
  const [reason, setReason] = useState('');

  useEffect(() => {
    setSelect([]);
  }, [props.show]);

  return (
    <Modal
      transparent
      style={styles.modal}
      visible={props.show}
      onClose={() => {
        props.setTransferShow(false);
      }}
      maskClosable>
      <View style={styles.modalTitleView}>
        <Text style={styles.modalTitle}>转单原因</Text>
      </View>
      <View>
        <TextInput
          value={reason}
          onChangeText={e => setReason(e)}
          numberOfLines={2}
          placeholder="转单原因填写"
          maxLength={20}
          multiline={true}
          style={styles.inputView}
        />
      </View>
      <View style={styles.buttonsView}>
        {reasonList.map(item => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                if (selectIndex.indexOf(item) >= 0) {
                  let list = selectIndex.filter(it => it !== item);
                  setSelect(list);
                } else {
                  setSelect([...selectIndex, item]);
                }
              }}
              key={item}
              style={
                selectIndex.indexOf(item) >= 0
                  ? styles.activeButton
                  : styles.unActiveButton
              }>
              <Text
                style={
                  selectIndex.indexOf(item) >= 0
                    ? styles.activeButtonTitle
                    : styles.unActiveButtonTitle
                }>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.buttonsView}>
        {reasonList2.map(item => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                if (selectIndex.indexOf(item) >= 0) {
                  let list = selectIndex.filter(it => it !== item);
                  setSelect(list);
                } else {
                  setSelect([...selectIndex, item]);
                }
              }}
              key={item}
              style={
                selectIndex.indexOf(item) >= 0
                  ? styles.activeButton
                  : styles.unActiveButton
              }>
              <Text
                style={
                  selectIndex.indexOf(item) >= 0
                    ? styles.activeButtonTitle
                    : styles.unActiveButtonTitle
                }>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.actionButtons}>
        <Button
          title="取消"
          onPress={() => {
            props.setTransferShow(false);
          }}
        />
        <Button
          title="确认"
          type="primary"
          onPress={() => {
            let ret = '';
            if (reason.length !== 0) {
              ret = reason + selectIndex.join('，');
            } else {
              ret = selectIndex.join('，');
            }
            props.confrimTransferOrder(ret);
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: 350,
  },
  modalTitleView: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 40,
  },
  modalTitle: {
    fontSize: 18,
  },
  activeButton: {
    height: 30,
    width: 100,
    backgroundColor: '#1677FE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  activeButtonTitle: {
    fontSize: 13,
    color: '#fff',
  },
  unActiveButton: {
    height: 30,
    width: 100,
    backgroundColor: '#F6F6F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  unActiveButtonTitle: {
    fontSize: 13,
    color: '#333',
  },
  buttonsView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  inputView: {
    height: 70,
    backgroundColor: '#f6f6f6',
    padding: 10,
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
});

export default TransferOrderModal;
