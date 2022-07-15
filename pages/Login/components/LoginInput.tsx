import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {rider} from '../../../api';
import IdUtils from '../../../utils/IdUtils';
import {Toast} from '@ant-design/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Identify from '../../../utils/Identify';

interface LoginInputProps {
  isProtocolSelect?: boolean;
  navigateReset: Function;
}

const LoginInput = (props: LoginInputProps) => {
  const [canLogin, setCanLogin] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHide] = useState(true);
  const [delay, setDelay] = useState(0);
  const changeText = (e: string) => {
    console.log(e);
    setPhone(e);
    setCanLoginStatus();
  };

  const changePassword = (e: string) => {
    setPassword(e);
    setCanLoginStatus();
  };

  const setCanLoginStatus = () => {
    if (phone && password) {
      setCanLogin(true);
    }
  };

  useEffect(() => {
    const timeId = setInterval(() => {
      if (delay >= 0) {
        setDelay(delay - 1);
      } else {
        clearInterval(timeId);
      }
    }, 1000);
    return () => {
      clearInterval(timeId);
    };
  }, [delay]);

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
      {!isPassword && (
        <View style={styles.inputLine}>
          <Text style={styles.inputTitle}>验证码</Text>
          <TextInput
            placeholder="请输入您的验证码"
            style={styles.input}
            onChangeText={changePassword}
          />
          {delay <= 0 ? (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.getCodeButton}
              onPress={() => {
                if (IdUtils.isPhoneNum(phone)) {
                  rider
                    .sendCaptcha({
                      phone: phone,
                    })
                    .then(res => {
                      console.log('res', res);
                      setDelay(60);
                      const {message} = res;
                      Toast.info(message);
                    });
                } else {
                  Toast.info('请输入正确手机号');
                }
              }}>
              <Text style={styles.getCodeText}>获取验证码</Text>
            </TouchableOpacity>
          ) : (
            <Text>剩余{delay}s</Text>
          )}
        </View>
      )}
      {isPassword && (
        <View style={styles.inputLine}>
          <Text style={styles.inputTitle}>密码</Text>
          <TextInput
            placeholder="请输入密码"
            style={styles.input}
            secureTextEntry={hidePassword}
            onChangeText={changePassword}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setHide(!hidePassword);
            }}>
            {hidePassword ? (
              <Image
                style={styles.passwordIcon}
                source={require('./assets/icon_password_hide.png')}
              />
            ) : (
              <Image
                style={styles.passwordIcon}
                source={require('./assets/icon_password_show.png')}
              />
            )}
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.changeLoginTypeButton}
        onPress={() => setIsPassword(!isPassword)}>
        <Text style={styles.buttonText}>
          {!isPassword ? '密码登录' : '验证码登录'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          if (!canLogin) {
            return;
          }
          if (!props.isProtocolSelect) {
            Toast.info('您还未勾选协议，请勾选后进行下一步');
            return;
          }

          if (isPassword) {
            rider
              .loginWithPassword({
                phone: phone,
                password: password,
              })
              .then(res => {
                console.log('res', res);
                const {success, result, message} = res;
                if (success) {
                  props.navigateReset();

                  const {token} = result;
                  AsyncStorage.setItem('localToken', token);

                  Identify().then(re => {
                    console.log('identify status', re);
                  });
                } else {
                  Toast.info(message);
                }
              });
          } else {
            rider
              .loginWithCaptcha({
                phone: phone,
                captcha: password,
              })
              .then(res => {
                console.log('res', res);
                const {success, result} = res;
                if (success) {
                  props.navigateReset();

                  const {token} = result;
                  AsyncStorage.setItem('localToken', token);
                }
              });
          }
        }}
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
  passwordIcon: {
    width: 21,
    height: 13,
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
