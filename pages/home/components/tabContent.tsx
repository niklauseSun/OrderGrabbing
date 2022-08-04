/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  DeviceEventEmitter,
  TouchableOpacity,
  LayoutAnimation,
  SafeAreaView,
} from 'react-native';

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
    {title: '待取货', index: 1},
    {title: '配送中', index: 2},
  ];

  const [orderList, setOrderList] = useState([]);
  const [tabIndex, setIndex] = useState(0);
  const [refreshing, setRefresh] = useState(false);

  const queryList = async (index: number, hideToast = false) => {
    if (!hideToast) {
      Toast.loading({
        content: '请求中',
      });
    }

    console.log('tabIndex', index);

    setOrderList([]);

    if (index === 0) {
      const res = await order.queryWaitGrab({
        pageSize: 10,
      });
      console.log(res);
      if (res.success) {
        const {result} = res;
        setOrderList(result);
      } else {
        Toast.info({
          content: res.message,
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
        const {result} = res;
        setOrderList(result.records);
        console.log('orderList', orderList);
      } else {
        Toast.info({
          content: res.message,
        });
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
        const {result} = res;
        setOrderList(result.records);
      } else {
        Toast.info({
          content: res.message,
        });
      }
    }
  };

  const onRefresh = () => {
    Toast.loading({
      content: '请求中',
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
    queryList(tabIndex, false);
  }, [tabIndex]);

  useEffect(() => {
    DeviceEventEmitter.addListener('refresh', function (index) {
      console.log('refresh 111', index);
      queryList(index, true);
    });
    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, []);

  return (
    // <View style={styles.content}>
    // <Tabs
    //   tabs={tabs}
    //   onTabClick={e => {
    //     console.log('tabClick', e);
    //     const {index} = e;
    //     setOrderList([]);
    //     queryList(index);
    //     setIndex(index);
    //   }}
    //   swipeable={false}
    //   tabBarPosition="top"
    //   tabBarBackgroundColor="#1677FE"
    //   tabBarInactiveTextColor="#fff"
    //   tabBarUnderlineStyle={styles.underLineStyle}
    //   tabBarActiveTextColor="#fff">
    <SafeAreaView style={styles.safeContent}>
      <View style={styles.tabContainer}>
        {tabs.map(({title, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={index}
              style={styles.tabButton}
              onPress={() => {
                setIndex(index);
                LayoutAnimation.easeInEaseOut();
              }}>
              <Text style={styles.tabButtonText}>{title}</Text>
              <View
                style={[
                  index === tabIndex
                    ? styles.bottomLine
                    : styles.bottomLineUnActive,
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.container}>
        {/* {!props.isLogin && <GoToLogin />} */}
        <FlatList
          onRefresh={onRefresh}
          refreshing={refreshing}
          style={styles.listStyle}
          data={orderList}
          ListEmptyComponent={<EmptyOrder />}
          renderItem={({item, index}) => {
            return (
              <OrderCard
                key={index}
                tabIndex={tabIndex}
                order={item}
                type={'waitGrab'}
              />
            );
          }}
        />
        <RefershBottom onRefresh={onRefresh} goToScan={goToScan} />
      </View>
      {/* <View style={styles.container}>
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
        <RefershBottom onRefresh={onRefresh} goToScan={goToScan} />
      </View> */}
      {/* <View style={styles.container}>
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
        <RefershBottom onRefresh={onRefresh} goToScan={goToScan} />
      </View> */}
    </SafeAreaView>
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
  safeContent: {
    display: 'flex',
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    zIndex: 100,
  },
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
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  scanButton: {
    width: 70,
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
    borderRadius: 10,
    height: 50,
  },
  listStyle: {
    flex: 1,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 48,
    backgroundColor: '#1677FE',
  },
  tabButton: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomLine: {
    height: 2,
    width: 20,
    backgroundColor: '#fff',
    marginTop: 8,
    borderRadius: 1,
  },

  bottomLineUnActive: {
    height: 2,
    width: 20,
    marginTop: 8,
  },
  tabButtonText: {
    color: '#fff',
    fontSize: 13,
  },
});

export default TabContent;
