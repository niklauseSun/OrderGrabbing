import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  DeviceEventEmitter,
  TouchableOpacity,
} from 'react-native';

import Tabs from '@ant-design/react-native/lib/tabs';
import OrderCard from './orderCard';
import order from '../../../api/order';
import {Toast} from '@ant-design/react-native';

interface TabContentProps {
  isLogin?: boolean;
  navigation: ReactNavigation;
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
      } else {
        Toast.info({
          content: res.message,
          duration: 1,
        });
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
      } else {
        info(res.messagToast.e);
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
      } else {
        Toast.info({
          content: res.message,
          duration: 1,
        });
      }
    }
  };

  const onRefresh = () => {
    Toast.loading({
      content: '请求中',
      duration: 1,
    });
    setOrderList([]);
    queryList(tabIndex);
    setTimeout(() => {
      console.log('close');
      setRefresh(false);
    }, 2000);
  };

  const goToScan = () => {
    props.navigation.navigate('ScanCamera');
  };

  useEffect(() => {
    queryList(0);
    DeviceEventEmitter.addListener('refresh', message => {
      console.log('refresh', message);
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
        {/* {!props.isLogin && <GoToLogin />} */}
        <FlatList
          onRefresh={onRefresh}
          refreshing={refreshing}
          data={orderList}
          ListEmptyComponent={<EmptyOrder />}
          renderItem={({item}) => {
            return <OrderCard order={item} type={'waitGrab'} />;
          }}
        />
        <RefershBottom onRefresh={onRefresh} goToScan={goToScan} />
      </View>
      <View style={styles.container}>
        {/* {!props.isLogin && <GoToLogin />} */}
        {/* {props.isLogin && ( */}
        <FlatList
          data={orderList}
          style={styles.listStyle}
          onRefresh={onRefresh}
          refreshing={refreshing}
          ListEmptyComponent={<EmptyOrder />}
          renderItem={({item}) => {
            return <OrderCard order={item} type={'waitPackage'} />;
          }}
        />
        {/* )} */}
        <RefershBottom onRefresh={onRefresh} goToScan={goToScan} />
      </View>
      <View style={styles.container}>
        {/* {!props.isLogin && <GoToLogin />}
        {props.isLogin && ( */}
        <FlatList
          style={styles.listStyle}
          onRefresh={onRefresh}
          refreshing={refreshing}
          data={orderList}
          renderItem={({item}) => {
            return <OrderCard order={item} type={'waitGrab'} />;
          }}
          ListEmptyComponent={<EmptyOrder />}
          ListFooterComponentStyle={styles.emptyContainer}
        />
        {/* )} */}
        <RefershBottom onRefresh={onRefresh} goToScan={goToScan} />
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

const RefershBottom = (props: any) => {
  return (
    <View style={styles.refreshContainer}>
      <TouchableOpacity
        onPress={() => {
          props.goToScan();
        }}
        activeOpacity={0.7}
        style={styles.scanButton}>
        <Image
          style={styles.scanImage}
          source={require('./assets/icon_scan.png')}
        />
        <Text style={styles.scanTitle}>扫码接单</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.onRefresh();
        }}
        activeOpacity={0.7}
        style={styles.refreshButton}>
        <Text style={styles.refreshButtonText}>刷新</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    flex: 1,
    width: '100%',
  },
  container: {
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
  refreshContainer: {
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#fff',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    bottom: 60,
    padding: 10,
  },
  scanButton: {
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanImage: {
    height: 24,
    width: 24,
  },
  scanTitle: {
    fontSize: 12,
  },
  refreshView: {
    width: '100%',
  },
  refreshButton: {
    backgroundColor: '#1677FE',
    marginLeft: 10,
    display: 'flex',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderRadius: 10,
  },
  listStyle: {
    marginBottom: 110,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TabContent;
