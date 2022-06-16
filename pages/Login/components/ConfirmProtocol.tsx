import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const ConfirmProtocol = () => {
  const [selected, setSelect] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          setSelect(!selected);
        }}>
        {selected ? (
          <Image
            style={styles.selectImage}
            source={require('./assets/selected.png')}
          />
        ) : (
          <Image
            style={styles.selectImage}
            source={require('./assets/unselected.png')}
          />
        )}
      </TouchableOpacity>
      <Text>我已阅读并同意</Text>
      <TouchableOpacity>
        <Text style={styles.pressStyle}>《用户协议》</Text>
      </TouchableOpacity>
      <Text>和</Text>
      <TouchableOpacity>
        <Text style={styles.pressStyle}>《隐私政策》</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 45,
  },
  pressStyle: {
    color: '#1677FE',
  },
  checkChoose: {
    width: 13,
    height: 13,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#707070',
  },
  selectImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default ConfirmProtocol;
