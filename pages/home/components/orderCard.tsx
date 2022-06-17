import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import CardActions from '../../../components/CardActions';
import LocationInfo from '../../../components/LocationInfo';

const OrderCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHead}>
        <View style={styles.cardHeadIcon} />
        <Text style={styles.cardHeadInfoText}>预计28分钟送到</Text>
        <Text style={styles.cardHeadPriceText}>￥8.5</Text>
      </View>
      <LocationInfo />
      <View style={styles.tagView}>
        <View style={styles.tag}>
          <Text style={styles.tagTitle}>龙虾</Text>
        </View>
      </View>
      <View style={styles.orangeTag}>
        <Text style={styles.orangeTagTitle}>备注：水果放门口</Text>
      </View>
      <CardActions />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: '#fff',
    paddingTop: 10,
    borderRadius: 7,
  },
  cardHead: {
    height: 40,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardHeadIcon: {
    width: 21,
    height: 21,
    borderRadius: 5,
    backgroundColor: '#e3e3e3',
    marginLeft: 15,
    marginRight: 9,
  },
  cardHeadInfoText: {
    display: 'flex',
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  cardHeadPriceText: {
    marginRight: 15,
    fontSize: 20,
    color: '#FC5F10',
  },
  tagView: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  tag: {
    height: 22,
    borderRadius: 5,
    borderColor: '#FC9E00',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  tagTitle: {
    color: '#FC9E00',
    fontSize: 13,
  },
  orangeTag: {
    backgroundColor: '#FC5F1029',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    marginHorizontal: 15,
    marginTop: 5,
  },
  orangeTagTitle: {
    fontSize: 14,
    color: '#333333',
  },
});

export default OrderCard;
