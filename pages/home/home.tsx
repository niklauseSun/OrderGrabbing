import {Provider} from '@ant-design/react-native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  useColorScheme,
  Text,
  StyleSheet,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import CancelOrder from '../../utils/CancelOrder';
import GetOrder from '../../utils/GetOrder';
import Identify from '../../utils/Identify';
import ToLogin from '../../utils/ToLogin';
import Header from './components/header';
import TabContent from './components/tabContent';

const App = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={styles.homeBg}>
      <Provider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Header />
        <TabContent />

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <TouchableOpacity
            onPress={() => {
              console.log('去登录');
              ToLogin({navigation: navigation});
              // navigation.navigate('Login');
            }}>
            <Text>去登录</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Detail');
            }}>
            <Text>去详情</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const identifyStaus = Identify();
              console.log('identifyStaus', identifyStaus);
            }}>
            <Text>去验证</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              GetOrder({
                visible: true,
              });
            }}>
            <Text>抢单</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              CancelOrder();
            }}>
            <Text>去取消</Text>
          </TouchableOpacity>
        </ScrollView>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeBg: {
    backgroundColor: '#1677FE',
    flex: 1,
  },
});

export default App;
