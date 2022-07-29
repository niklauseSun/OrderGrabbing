import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';
import ToTakePic from '../../../utils/ToTakePic';

const TakePic = props => {
  console.log('pic', props.orderDetail);
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.title}>拍照留存</Text>
      </View>
      <View style={styles.subInfos}>
        <View style={styles.imagePick}>
          <TouchableOpacity style={styles.takeButton} activeOpacity={0.7}>
            <Image
              style={styles.takePic}
              source={require('./assets/icon_take_pic.png')}
            />
          </TouchableOpacity>
          <Text>取件拍照</Text>
        </View>
        <View style={styles.imagePick}>
          <TouchableOpacity
            style={styles.takeButton}
            activeOpacity={0.7}
            onPress={() => {
              console.log('takePick');
              // ToTakePic();
            }}>
            <Image
              style={styles.takePic}
              source={require('./assets/icon_take_pic.png')}
            />
          </TouchableOpacity>
          <Text>完成拍照</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 14,
    marginTop: 10,
    padding: 12,
    borderRadius: 7,
    marginBottom: 10,
  },
  head: {
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  subTitle: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subInfos: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imagePick: {
    width: 120,
    display: 'flex',
    alignItems: 'center',
  },
  takeButton: {
    width: 110,
    height: 164,
    backgroundColor: '#e3e3e3',
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  takePic: {
    width: 60,
    height: 60,
  },
});
export default TakePic;
