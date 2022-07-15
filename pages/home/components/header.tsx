import React from 'react';

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Popover} from '@ant-design/react-native';
import ToWebPage from '../../../utils/ToWebPage';
interface HeaderProps {
  infoStatus: string;
  status: string;
  navigation: ReactNavigation;
}

const Header = (props: HeaderProps) => {
  const {status} = props;
  const type = 'identifySuccess'; // 认证中;
  return (
    <View style={styles.container}>
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

        {type === 'identify' && <IdentifyStatus type={'process'} />}
        {type !== 'identify' && <SwitchStatsu status={status} />}
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            style={styles.iconMessage}
            source={require('./assets/icon_message.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const IdentifyStatus = (props: any) => {
  //   const type = 'process'; // fail 失败
  return (
    <>
      <View style={styles.idLine} />
      {props.type === 'process' && (
        <>
          <Text style={styles.idTitle}>审核中</Text>
          <Image
            style={styles.idIcon}
            source={require('./assets/id_status_ing.png')}
          />
        </>
      )}
      {props.type === 'fail' && (
        <>
          <Text style={styles.idTitle}>认证不通过</Text>
          <Image
            style={styles.idIcon}
            source={require('./assets/id_status_fail.png')}
          />
        </>
      )}
    </>
  );
};

const SwitchStatsu = props => {
  const {status} = props;
  // on || off

  return (
    <View style={styles.popContainer}>
      <Popover
        placement="bottom"
        overlay={
          <Popover.Item value={'test'}>
            <TouchableOpacity activeOpacity={0.7} style={styles.popButton}>
              <Text style={styles.popButtonTitle}>
                {status === 'on' ? '接单中' : '休息中'}
              </Text>
            </TouchableOpacity>
          </Popover.Item>
        }>
        <View style={styles.titleView}>
          <Text style={styles.switchTitle}>
            {status === 'on' ? '休息中' : '接单中'}
          </Text>
          <Image
            style={styles.iconDown}
            source={require('./assets/icon_arrow_down.png')}
          />
        </View>
      </Popover>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
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
