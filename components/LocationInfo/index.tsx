import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

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
  echoButton?: number;
}

const LocationInfo = (props: LocationProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.targetView}>
        <View style={styles.targetHead}>
          <View style={styles.targetDistanceView}>
            <Text style={styles.distanceText}>
              {props.riderToSendAddressDistance &&
                Number(props.riderToSendAddressDistance).toFixed(2)}
            </Text>
            <Text style={styles.distanceText}>km</Text>
          </View>
          <View style={styles.targetLine} />
          <Image
            style={styles.iconSize}
            source={require('../assets/icon_arrow_down.png')}
          />
        </View>
        <View style={styles.targetLocation}>
          <Text style={styles.targetLocationTitle} numberOfLines={1}>
            {props.sendMessage.storeName}
          </Text>
          <Text style={styles.targetLocationSubTitle} numberOfLines={2}>
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
              {props.sendToReceiveAddressDistance
                ? Number(props.sendToReceiveAddressDistance).toFixed(2)
                : Number(0).toFixed(2)}
            </Text>
            <Text style={styles.distanceText}>km</Text>
          </View>
        </View>
        <View style={styles.targetLocation}>
          <Text style={styles.targetLocationTitle} numberOfLines={1}>
            {props.receiveMessage.address}
          </Text>
          {props.status !== '10000000' && (
            <Text style={styles.phone}>
              {props.receiveMessage.name} {props.receiveMessage.phone}
            </Text>
          )}
        </View>
      </View>
      {(props.echoButton === 2 || props.echoButton === 3) && (
        <Image
          style={styles.transferIcon}
          source={require('../assets/icon_transfer_tag.png')}
        />
      )}
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
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
    height: 'auto',
  },
  targetLocationTitle: {
    fontSize: 17,
    lineHeight: 24,
    color: '#333',
    marginBottom: 2,
    height: 24,
  },
  targetLocationSubTitle: {
    fontSize: 13,
    color: '#333',
    lineHeight: 19,
    fontWeight: 'bold',
    height: 20,
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
  iconSize: {
    width: 6,
    height: 6,
  },
  transferIcon: {
    height: 81,
    width: 64,
    position: 'absolute',
    right: 0,
    top: 10,
  },
});

export default LocationInfo;
