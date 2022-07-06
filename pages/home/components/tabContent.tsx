import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  DeviceEventEmitter,
} from 'react-native';

import Tabs from '@ant-design/react-native/lib/tabs';
import OrderCard from './orderCard';
import order from '../../../api/order';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ToLogin from '../../../utils/ToLogin';

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
  const [tabIndex, setIndex] = useState(0);
  const [refreshing, setRefresh] = useState(false);

  const queryList = async (index: number) => {
    if (index === 0) {
      const res = await order.queryWaitGrab({pageSize: 10});
      console.log(res);
      if (res.success) {
        const {result} = res;
        setOrderList(result);
      }
    }

    if (index === 1) {
      const res = await order.queryWaitPackage({
        pageIndex: 1,
        pageSize: 10,
        tab: 1,
      });
      console.log(res);
      if (res.success) {
        const {result = []} = res;
        setOrderList(result.records);
      }
    }
    if (index === 2) {
      const res = await order.queryWaitPackage({
        pageIndex: 1,
        pageSize: 10,
        tab: 2,
      });
      console.log(res);
      if (res.success) {
        const {result = []} = res;
        setOrderList(result.records);
      }
    }
  };

  const onRefresh = () => {
    setOrderList([]);
    queryList(tabIndex);
    setTimeout(() => {
      console.log('close');
      setRefresh(false);
    }, 2000);
  };

  useEffect(() => {
    queryList(0);
    DeviceEventEmitter.addListener('refresh', () => {
      console.log('refresh');
      queryList(0);
    });
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
        setIndex(index);
      }}
      swipeable={false}
      tabBarPosition="top"
      tabBarBackgroundColor="#1677FE"
      tabBarInactiveTextColor="#fff"
      tabBarUnderlineStyle={styles.underLineStyle}
      tabBarActiveTextColor="#fff">
      <View style={styles.container}>
        {!props.isLogin && <GoToLogin />}
        {props.isLogin && (
          <FlatList
            onRefresh={onRefresh}
            refreshing={refreshing}
            data={orderList}
            renderItem={({item}) => {
              return <OrderCard order={item} type={'waitGrab'} />;
            }}
          />
        )}
      </View>
      <View style={styles.container}>
        {!props.isLogin && <GoToLogin />}
        {props.isLogin && (
          <FlatList
            data={orderList}
            onRefresh={onRefresh}
            refreshing={refreshing}
            ListEmptyComponent={<EmptyOrder />}
            renderItem={({item}) => {
              return <OrderCard order={item} type={'waitPackage'} />;
            }}
          />
        )}
      </View>
      <View style={styles.container}>
        {!props.isLogin && <GoToLogin />}
        {props.isLogin && (
          <FlatList
            onRefresh={onRefresh}
            refreshing={refreshing}
            data={orderList}
            renderItem={({item}) => {
              return <OrderCard order={item} type={'waitGrab'} />;
            }}
            ListEmptyComponent={<EmptyOrder />}
            ListFooterComponentStyle={styles.emptyContainer}
          />
        )}
      </View>
    </Tabs>
  );
};

const EmptyOrder = () => {
  return (
    <View style={styles.emptyContainer}>
      <Image
        style={styles.emptyImage}
        source={require('./assets/no_order.png')}
      />
      <Text>暂无订单</Text>
    </View>
  );
};

const GoToLogin = () => {
  return (
    <View style={styles.loginContain}>
      <TouchableOpacity
        style={styles.loginButton}
        activeOpacity={0.7}
        onPress={() => {
          ToLogin();
        }}>
        <Text style={styles.loginButtonTitle}>登录</Text>
      </TouchableOpacity>
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
    display: 'flex',
    flex: 1,
  },
  underLineStyle: {
    backgroundColor: '#fff',
  },
  emptyContainer: {
    width: '100%',
    height: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyImage: {
    width: 123,
    height: 88,
  },
  loginContain: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    width: 130,
    height: 40,
    backgroundColor: '#1677FE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  loginButtonTitle: {
    fontSize: 14,
    color: '#fff',
  },
});

export default TabContent;
