import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  useColorScheme,
  Text,
  View,
  StyleSheet,
  FlatList,
} from 'react-native';

import {Tabs, Button} from '@ant-design/react-native';
import OrderCard from './orderCard';
import order from '../../../api/order';

interface TabContentProps {
  isLogin?: boolean;
}

const TabContent = (props: TabContentProps) => {
  const tabs = [
    {title: '待抢单', index: 0},
    {title: '待配货', index: 1},
    {title: '配送中', index: 2},
  ];

  const [orderList, setOrderList] = useState([]);

  const queryList = async (index: number) => {
    if (index === 0) {
      const res = await order.queryWaitGrab({pageSize: 10});
      console.log(res);
      if (res.success) {
        const {result} = res;
        setOrderList(result);
      }
    }
  };

  useEffect(() => {
    queryList(0);
  }, []);

  return (
    // <View style={styles.content}>
    <Tabs
      tabs={tabs}
      onTabClick={e => {
        console.log('tabClick', e);
        const {index} = e;
        setOrderList([]);
        queryList(index);
      }}
      tabBarPosition="top"
      tabBarBackgroundColor="#1677FE"
      tabBarInactiveTextColor="#fff"
      tabBarUnderlineStyle={styles.underLineStyle}
      tabBarActiveTextColor="#fff">
      <View style={styles.container}>
        {!props.isLogin && <GoToLogin />}
        {props.isLogin && (
          <FlatList
            data={orderList}
            renderItem={({item}) => {
              console.log('ret', item);
              return <OrderCard order={item} type={'waitGrab'} />;
            }}
          />
        )}
      </View>
      <View style={styles.container}>{!props.isLogin && <GoToLogin />}</View>
      <View style={styles.container}>{!props.isLogin && <GoToLogin />}</View>
    </Tabs>
  );
};

const GoToLogin = () => {
  return (
    <View>
      <Button>登录</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    height: '100%',
    backgroundColor: '#F6F6F6',
    width: '100%',
  },
  underLineStyle: {
    backgroundColor: '#fff',
  },
});

export default TabContent;
