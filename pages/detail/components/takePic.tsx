import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const TakePic = props => {
  console.log('pic', props.orderDetail);
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.title}>拍照留存</Text>
      </View>
      <View style={styles.subInfos}>
        {props.orderDetail.collectOrderPicture && (
          <View style={styles.imagePick}>
            <View style={styles.takeButton}>
              <Image
                style={styles.takePic}
                source={{
                  uri: props.orderDetail.pickUpOrderPhotoUrl,
                }}
              />
            </View>
            <Text>取件拍照</Text>
          </View>
        )}
        {props.orderDetail.receiveOrderPicture && (
          <View style={styles.imagePick}>
            <View style={styles.takeButton}>
              <Image
                style={styles.takePic}
                source={{
                  uri: props.orderDetail.receiveOrderPhotoUrl,
                }}
              />
            </View>
            <Text>完成拍照</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 14,
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
    width: '100%',
    height: '100%',
  },
});
export default TakePic;
