import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';

const LocationInfo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.targetView}>
        <View style={styles.targetHead}>
          <View style={styles.targetDistanceView}>
            <Text>1.7</Text>
            <Text>km</Text>
          </View>
          <View style={styles.targetLine} />
        </View>
        <View style={styles.targetLocation}>
          <Text style={styles.targetLocationTitle}>杭州夏阳商店备份</Text>
          <Text style={styles.targetLocationSubTitle}>
            浙江省杭州市萧山区人民路118号备份
          </Text>
          <Text style={styles.phone}>熊猫 13301435591</Text>
        </View>
      </View>
      <View style={styles.fromView}>
        <View style={styles.targetHead}>
          <View style={styles.targetDistanceView}>
            <Text>2.7</Text>
            <Text>km</Text>
          </View>
        </View>
        <View style={styles.targetLocation}>
          <Text style={styles.targetLocationTitle}>杭州夏阳商店备份</Text>
          <Text style={styles.phone}>熊猫 13301435591</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 5,
  },
  targetView: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 19,
  },
  fromView: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 19,
    alignItems: 'center',
  },
  targetHead: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 5,
    alignItems: 'center',
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
    marginLeft: 10,
  },
  targetLocationTitle: {
    fontSize: 20,
    lineHeight: 24,
    color: '#333',
    marginBottom: 2,
  },
  targetLocationSubTitle: {
    fontSize: 16,
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
