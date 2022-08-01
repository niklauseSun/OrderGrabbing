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
  riderToSendAddressDistance?: string;
  sendToReceiveAddressDistance?: string;
  status?: string;
}

const LocationInfo = (props: LocationProps) => {
  console.log('locationInfo', props);
  return (
    <View style={styles.container}>
      <View style={styles.targetView}>
        <View style={styles.targetHead}>
          <View style={styles.targetDistanceView}>
            <Text style={styles.distanceText}>
              {props.riderToSendAddressDistance}
            </Text>
            <Text style={styles.distanceText}>km</Text>
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
          {props.status !== '10000000' && (
            <Text style={styles.phone}>
              {props.sendMessage.name} {props.sendMessage.phone}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.fromView}>
        <View style={styles.targetHead}>
          <View style={styles.targetDistanceView}>
            <Text style={styles.distanceText}>
              {props.sendToReceiveAddressDistance}
            </Text>
            <Text style={styles.distanceText}>km</Text>
          </View>
        </View>
        <View style={styles.targetLocation}>
          <Text style={styles.targetLocationTitle}>
            {props.receiveMessage.address}
          </Text>
          {props.status !== '10000000' && (
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
    display: 'flex',
    alignItems: 'center',
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
    marginTop: 14,
  },
  targetLocationTitle: {
    fontSize: 17,
    lineHeight: 24,
    color: '#333',
    marginBottom: 2,
  },
  targetLocationSubTitle: {
    fontSize: 13,
    color: '#333',
    lineHeight: 19,
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 13,
    color: '#333',
    marginTop: 8,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  distanceText: {
    fontSize: 12,
  },
});

export default LocationInfo;
