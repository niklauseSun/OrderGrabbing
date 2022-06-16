import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const LoginInput = () => {
  const [canLogin, setLogin] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const changeText = (e: any) => {
    console.log(e);
  };
  return (
    <View style={styles.container}>
      <View style={styles.loginSubInfo}>
        <Text style={styles.loginTitle}>登录/注册</Text>
        {!isPassword ? (
          <Text style={styles.loginSubTitle}>未注册的用户请优先注册后登录</Text>
        ) : (
          <>
            <Text style={styles.loginSubTitle}>若为首次登录，将自行注册</Text>
            <Text style={styles.loginSubTitle}>
              注意，无法通过密码登录进行注册
            </Text>
          </>
        )}
      </View>
      <View style={styles.inputLine}>
        <Text style={styles.inputTitle}>手机号</Text>
        <TextInput
          placeholder="请输入您的手机号"
          style={styles.input}
          onChangeText={changeText}
        />
      </View>
      <View style={styles.inputLine}>
        <Text style={styles.inputTitle}>验证码</Text>
        <TextInput placeholder="请输入您的验证码" style={styles.input} />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.getCodeButton}
          onPress={() => {}}>
          <Text style={styles.getCodeText}>获取验证码</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.changeLoginTypeButton}
        onPress={() => setIsPassword(!isPassword)}>
        <Text style={styles.buttonText}>
          {isPassword ? '密码登录' : '验证码登录'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={
          canLogin
            ? [styles.loginButton, styles.isActive]
            : [styles.loginButton]
        }>
        <Text
          style={
            canLogin
              ? [styles.loginButtonTitle, styles.isActiveTitle]
              : [styles.loginButtonTitle]
          }>
          登录
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: 45,
  },
  loginSubInfo: {
    width: '100%',
    paddingHorizontal: 23,
    marginTop: 40,
    height: 100,
    backgroundColor: 'red',
  },
  loginTitle: {
    fontSize: 21,
    color: '#333333',
    marginBottom: 6,
  },
  loginSubTitle: {
    fontSize: 12,
    color: '#c4c4c4',
    fontWeight: '400',
  },
  getCodeButton: {
    width: 99,
    height: 25,
    backgroundColor: '#1677EE',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  getCodeText: {
    fontSize: 13,
    color: '#fff',
  },
  inputLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderBottomWidth: 1,
    marginHorizontal: 25,
    borderBottomColor: '#E1E2E3',
  },
  inputTitle: {
    width: 50,
    fontSize: 15,
  },
  input: {
    display: 'flex',
    flex: 1,
  },
  changeLoginTypeButton: {
    marginLeft: 25,
    marginTop: 14,
    color: '#808080',
  },
  buttonText: {
    color: '#808080',
    fontSize: 15,
  },
  loginButton: {
    marginHorizontal: 25,
    backgroundColor: '#F6F6F6',
    height: 45,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 35,
  },
  isActive: {
    backgroundColor: '#1677FE',
  },
  loginButtonTitle: {
    fontSize: 15,
    color: '#333333',
  },
  isActiveTitle: {
    color: '#fff',
  },
});

export default LoginInput;
