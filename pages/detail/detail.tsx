import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
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
      <View style={styles.mapView}>{/* <RiderMapView /> */}</View>
      <View style={styles.innerContainer}>
        {orderDetail && <BottomAction orderDetail={orderDetail} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
    height: '100%',
  },
  mapView: {
    width: '100%',
    display: 'flex',
    backgroundColor: '#e3e3e3',
    height: '100%',
    position: 'absolute',
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
});

export default Detail;
