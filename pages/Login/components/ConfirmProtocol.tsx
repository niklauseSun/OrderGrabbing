import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import RNExitApp from 'react-native-exit-app';

interface ConfirmProtocolProps {
  isSelect?: boolean;
  changeSelect: Function;
}
const ConfirmProtocol = (props: ConfirmProtocolProps) => {
  const [modalVisible, setModelVisible] = useState(true);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          if (!props.isSelect) {
            setModelVisible(true);
          } else {
            props.changeSelect(!props.isSelect);
          }
        }}>
        {props.isSelect ? (
          <Image
            style={styles.selectImage}
            source={require('./assets/selected.png')}
          />
        ) : (
          <Image
            style={styles.selectImage}
            source={require('./assets/unselected.png')}
          />
        )}
      </TouchableOpacity>
      <Text>我已阅读并同意</Text>
      <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
        <Text style={styles.pressStyle}>《用户协议》</Text>
      </TouchableOpacity>
      <Text>和</Text>
      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.pressStyle}>《隐私政策》</Text>
      </TouchableOpacity>
      <Modal
        presentationStyle="overFullScreen"
        statusBarTranslucent
        visible={modalVisible}
        onRequestClose={() => {
          setModelVisible(!modalVisible);
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setModelVisible(!modalVisible);
          }}
          style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>用户协议及隐私政策</Text>
            </View>
            <View style={styles.modalContentView}>
              <Text>
                &nbsp;&nbsp;&nbsp;&nbsp;请您务必审慎阅读、充分理解“用户协议及隐私政策”各条款，包括但不限于：为了更好的向您提供服务，我们需要收集您的设备标识、操作日志等信息用于分析、优化应用性能。
              </Text>
              <Text />
              <Text>
                &nbsp;&nbsp;&nbsp;&nbsp;您可阅读《用户协议》和《隐私政策》了解详细信息。如果您同意、请点击按钮开始接受我们的服务。
              </Text>
            </View>
            <View style={styles.bottomActions}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.bottomButton, styles.bottomButtonBlue]}
                onPress={() => {
                  props.changeSelect(true);
                  setModelVisible(!modalVisible);
                }}>
                <Text style={styles.bottomButtonTitleBlue}>同意并接受</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.bottomButton}
                onPress={() => {
                  setModelVisible(!modalVisible);
                  // TODO 如何关闭APP
                  RNExitApp.exitApp();
                }}>
                <Text style={styles.bottomButtonTitle}>不同意并退出APP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 45,
  },
  pressStyle: {
    color: '#1677FE',
  },
  checkChoose: {
    width: 13,
    height: 13,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#707070',
  },
  selectImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  modalView: {
    width: 320,
    height: 400,
    margin: 0,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingBottom: 24,
    paddingRight: 24,
    paddingLeft: 24,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#00000035',
  },
  titleView: {
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 18,
  },
  modalContentView: {
    flex: 1,
  },
  bottomActions: {
    display: 'flex',
    flexDirection: 'column',
  },
  bottomButton: {
    width: 272,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
  },
  bottomButtonBlue: {
    backgroundColor: '#1677FE',
    marginBottom: 15,
  },
  bottomButtonTitleBlue: {
    fontSize: 16,
    color: '#fff',
  },
  bottomButtonTitle: {
    fontSize: 16,
    color: '#333333',
  },
});

export default ConfirmProtocol;
