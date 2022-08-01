import React from 'react';

import {
  DeviceEventEmitter,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Popover} from '@ant-design/react-native';
import ToWebPage from '../../../utils/ToWebPage';
import {rider} from '../../../api';
interface HeaderProps {
  infoStatus: string;
  status: string;
  navigation: ReactNavigation;
}

const Header = (props: HeaderProps) => {
  const {infoStatus, status} = props;
  console.log('header props', props);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContent}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            ToWebPage(
              'https://rider-test-app.zhuopaikeji.com/pages/mainPage/mine/mine',
            );
          }}>
          <Image
            style={styles.headLeftIcon}
            source={require('./assets/icon_person.png')}
          />
        </TouchableOpacity>

        {infoStatus !== '10150010' && (
          <IdentifyStatus infoStatus={infoStatus} />
        )}
        {infoStatus === '10150010' && <SwitchStatsu status={status} />}
        <TouchableOpacity activeOpacity={0.7}>
          {/* <Image
            style={styles.iconMessage}
            source={require('./assets/icon_message.png')}
          /> */}
          <View style={styles.iconMessage} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const IdentifyStatus = (props: any) => {
  //   const type = 'process'; // fail 失败
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.idView}
      onPress={() => {
        ToWebPage(
          'https://rider-test-app.zhuopaikeji.com/pages/realName/index',
        );
      }}>
      <View style={styles.idLine} />
      {props.infoStatus === '10150000' && (
        <>
          <Text style={styles.idTitle}>审核中</Text>
          <Image
            style={styles.idIcon}
            source={require('./assets/id_status_ing.png')}
          />
        </>
      )}
      {props.infoStatus === '10150005' && (
        <>
          <Text style={styles.idTitle}>审核中</Text>
          <Image
            style={styles.idIcon}
            source={require('./assets/id_status_ing.png')}
          />
        </>
      )}
      {props.infoStatus === '10150015' && (
        <>
          <Text style={styles.idTitle}>认证不通过</Text>
          <Image
            style={styles.idIcon}
            source={require('./assets/id_status_fail.png')}
          />
        </>
      )}
    </TouchableOpacity>
  );
};

const SwitchStatsu = props => {
  const {status} = props;
  // on || off

  return (
    <SafeAreaView style={styles.popContainer}>
      <Popover
        placement="bottom"
        overlay={
          <Popover.Item value={'test'}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.popButton}
              onPress={() => {
                if (status === '10100010') {
                  rider
                    .switchUserStatus({
                      status: '10100005',
                    })
                    .then(obj => {
                      console.log('res', obj);
                      DeviceEventEmitter.emit('refreshStatus');
                    });
                } else {
                  rider
                    .switchUserStatus({
                      status: '10100010',
                    })
                    .then(obj => {
                      console.log('res', obj);
                      DeviceEventEmitter.emit('refreshStatus');
                    });
                }
              }}>
              <Text style={styles.popButtonTitle}>
                {status === '10100010' ? '接单中' : '休息中'}
              </Text>
            </TouchableOpacity>
          </Popover.Item>
        }>
        <View style={styles.titleView}>
          {status === '10100010' && (
            <Text style={styles.switchTitle}>休息中</Text>
          )}
          {status === '10100005' && (
            <Text style={styles.switchTitle}>接单中</Text>
          )}
          <Image
            style={styles.iconDown}
            source={require('./assets/icon_arrow_down.png')}
          />
        </View>
      </Popover>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1677FE',
  },
  headerContent: {
    height: 50,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 17,
  },
  headLeftIcon: {
    height: 22,
    width: 22,
  },
  idView: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  idLine: {
    height: 12,
    width: 1,
    backgroundColor: '#fff',
    marginRight: 20,
    marginLeft: 20,
  },
  idTitle: {
    color: '#fff',
    fontSize: 16,
    marginRight: 5,
  },
  idIcon: {
    width: 22,
    height: 22,
  },
  popContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchTitle: {
    fontSize: 16,
    color: '#fff',
    marginRight: 5,
  },
  popButton: {
    width: 120,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popButtonTitle: {
    fontSize: 16,
    color: '#333',
  },
  iconMessage: {
    width: 24,
    height: 24,
  },
  iconDown: {
    width: 12,
    height: 12,
  },
  titleView: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Header;
