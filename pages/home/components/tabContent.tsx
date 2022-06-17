import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  useColorScheme,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import {Tabs} from '@ant-design/react-native';
import OrderCard from './orderCard';

const TabContent = () => {
  const tabs = [{title: '待抢单'}, {title: '待配货'}, {title: '配送中'}];
  return (
    // <View style={styles.content}>
    <Tabs
      tabs={tabs}
      tabBarPosition="top"
      tabBarBackgroundColor="#1677FE"
      tabBarInactiveTextColor="#fff"
      tabBarUnderlineStyle={styles.underLineStyle}
      tabBarActiveTextColor="#fff">
      <View style={styles.container}>
        <OrderCard />
      </View>
      <View style={styles.container}>
        <Text>Content of Second Tab</Text>
      </View>
      <View style={styles.container}>
        <Text>Content of Third Tab</Text>
      </View>
    </Tabs>
    // </View>
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
