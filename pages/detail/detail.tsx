import {Toast} from '@ant-design/react-native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {order} from '../../api';

import BottomAction from './components/bottomAction';
import RiderMapView from './components/RiderMapView';

const Detail = ({route}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [orderDetail, setOrderDetails] = useState(undefined);

  useEffect(() => {
    const {params} = route;
    const {id} = params;
    Toast.loading({
      content: '加载中...',
      duration: 1,
    });

    order.getOrderDetail(id).then(res => {
      console.log('orderDetail', res);
      if (res.success) {
        setOrderDetails(res.result);
      }
    });
  }, [route]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.mapView}>
        {orderDetail && <RiderMapView orderDetail={orderDetail} />}
      </View>
      <View style={styles.tipView}>
        <View style={styles.tipLine}>
          <Image
            style={styles.tipIcon}
            source={require('./components/assets/store_icon.png')}
          />
          <Text style={styles.tipTitle}>取货点</Text>
        </View>
        <View style={styles.tipLine}>
          <Image
            style={styles.tipIcon}
            source={require('./components/assets/delivery_icon.png')}
          />
          <Text style={styles.tipTitle}>送货点</Text>
        </View>
      </View>
      {orderDetail && <BottomAction orderDetail={orderDetail} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: '100%',
    position: 'absolute',
  },
  mapView: {
    width: '100%',
    display: 'flex',
    height: '100%',
  },
  wxButton: {
    marginLeft: 20,
    marginRight: 20,
    height: 45,
    borderRadius: 10,
    backgroundColor: '#54B937',
    borderColor: '#54B937',
    width: 330,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneButton: {
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    backgroundColor: '#1677FE',
    height: 45,
    fontSize: 15,
    width: 330,
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
  },
  helloImage: {
    width: 120,
    height: 120,
    backgroundColor: 'red',
    marginTop: 100,
    marginBottom: 70,
  },

  logo: {
    marginTop: 120,
    marginBottom: 100,
    backgroundColor: 'red',
    width: 90,
    height: 90,
  },
  tipView: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    zIndex: 900,
  },
  tipLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipIcon: {
    width: 24,
    height: 24,
  },
  tipTitle: {
    fontSize: 13,
  },
});

export default Detail;
