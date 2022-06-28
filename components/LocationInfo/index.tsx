import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface LocationInfoProps {
  address: string;
  name: string;
  phone: string;
  regionCode: string;
  storeName?: string;
  longitude: number;
  latitude: number;
}
interface LocationProps {
  receiveMessage: LocationInfoProps;
  sendMessage: LocationInfoProps;
  riderToSendAddressDistance: string;
  sendToReceiveAddressDistance: string;
  type: string | 'waitGrab' | 'waitPackage' | 'delivery';
}

const LocationInfo = (props: LocationProps) => {
  console.log('locationInfo', props);
  return (
    <View style={styles.container}>
      <View style={styles.targetView}>
        <View style={styles.targetHead}>
          <View style={styles.targetDistanceView}>
            <Text>{props.riderToSendAddressDistance}</Text>
            <Text>km</Text>
          </View>
          <View style={styles.targetLine} />
        </View>
        <View style={styles.targetLocation}>
          <Text style={styles.targetLocationTitle}>
            {props.sendMessage.storeName}
          </Text>
          <Text style={styles.targetLocationSubTitle}>
            {props.sendMessage.address}
          </Text>
          {props.type !== 'waitGrab' && (
            <Text style={styles.phone}>
              {props.sendMessage.name} {props.sendMessage.phone}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.fromView}>
        <View style={styles.targetHead}>
          <View style={styles.targetDistanceView}>
            <Text>{props.sendToReceiveAddressDistance}</Text>
            <Text>km</Text>
          </View>
        </View>
        <View style={styles.targetLocation}>
          <Text style={styles.targetLocationSubTitle}>
            {props.receiveMessage.address}
          </Text>
          {props.type !== 'waitGrab' && (
            <Text style={styles.phone}>
              {props.receiveMessage.name} {props.receiveMessage.phone}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 5,
    flex: 1,
  },
  targetView: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    flex: 1,
  },
  fromView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  targetHead: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 50,
  },
  targetDistanceView: {
    paddingTop: 5,
  },
  targetLine: {
    width: 1,
    height: 30,
    backgroundColor: '#e3e3e3',
  },
  targetLocation: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingRight: 10,
  },
  targetLocationTitle: {
    fontSize: 18,
    lineHeight: 24,
    color: '#333',
    marginBottom: 2,
  },
  targetLocationSubTitle: {
    fontSize: 14,
    color: '#333',
    lineHeight: 19,
  },
  phone: {
    fontSize: 14,
    color: '#000',
    marginTop: 8,
    marginBottom: 5,
  },
});

export default LocationInfo;
