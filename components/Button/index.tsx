import React from 'react';
import {TouchableOpacity, Text, StyleSheet, ViewStyle} from 'react-native';

interface ButtonTypes {
  title?: string;
  type?: string | 'primary';
  style?: ViewStyle;
  onPress?: Function | undefined;
}

const Button = (props: ButtonTypes) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={e => {
        if (props.onPress) {
          props.onPress(e);
        }
      }}
      style={[
        props.style,
        props.type === 'primary' ? styles.buttonView : styles.buttomDefault,
      ]}>
      <Text
        style={[props.type === 'primary' ? styles.title : styles.defaultTitle]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    borderRadius: 5,
    backgroundColor: '#1677FE',
    width: 153,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttomDefault: {
    borderRadius: 5,
    backgroundColor: '#F6F6F6',
    width: 153,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
  },
  defaultTitle: {
    color: '#000',
  },
});

export default Button;
