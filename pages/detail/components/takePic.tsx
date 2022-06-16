import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';

const TakePic = () => {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.title}>拍照留存</Text>
      </View>
      <View style={styles.subInfos}>
        <View style={styles.imagePick}>
          <TouchableOpacity style={styles.takeButton} activeOpacity={0.7} />
          <Text>取件拍照</Text>
        </View>
        <View style={styles.imagePick}>
          <TouchableOpacity style={styles.takeButton} activeOpacity={0.7} />
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
  },
});
export default TakePic;
