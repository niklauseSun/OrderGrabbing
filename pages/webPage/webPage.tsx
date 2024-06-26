import React, {useRef, useState} from 'react';
import WebView from 'react-native-webview';
import {
  DeviceEventEmitter,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToDetail from '../../utils/ToDetail';
import {Modal} from '@ant-design/react-native';
import config from '../../utils/config';

const MessageType = {
  logout: 'logout',
  detail: 'orderDetail',
  closeWebview: 'closeWebview',
  refreshRiderInfo: 'refreshRiderInfo',
  identify: 'identify',
};

const WebPage = props => {
  console.log('props', props);
  const {route, navigation} = props;
  const {params} = route;
  const {url, token, mobilePhone} = params;
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  const handleWebViewNavigationStateChange = nativeNavigation => {
    console.log('nativeEvent', nativeNavigation);
    const {title, canGoBack: canGo} = nativeNavigation;
    navigation.setOptions({
      title: title,
      headerBackTitleStyle: {
        backgroundColor: 'red',
        color: 'red',
      },
      headerBackTitle: 'fanhui',
    });
    setCanGoBack(canGo);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            console.log('webRef', webViewRef.current);

            if (canGoBack) {
              webViewRef.current && webViewRef.current.goBack();
            } else {
              navigation.goBack();
            }
          }}>
          <Image
            style={styles.backIcon}
            source={require('./assets/header_back_white.png')}
          />
        </TouchableOpacity>
      ),
    });
  }, [canGoBack, navigation]);

  const injectedJS = `
    (function() {
      window.localStorage.setItem('token', '${token}');
      window.localStorage.setItem('userPhone', '${mobilePhone || ''}');
      window.localStorage.setItem('tenantCode', '${config.tenantCode}');
    })();
  `;

  const onMessageHandle = async (e: any) => {
    console.log('onMessage', e.nativeEvent.data);
    const str = e.nativeEvent.data;
    const obj = JSON.parse(str);

    switch (obj.type) {
      case MessageType.closeWebview:
        props.navigation.goBack();
        break;
      case MessageType.logout:
        Modal.alert('推出登录', '确定要退出登录吗？', [
          {text: '取消', onPress: () => console.log('cancel')},
          {
            text: '确认',
            onPress: async () => {
              await AsyncStorage.setItem('localToken', '');
              props.navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'Login',
                    params: {
                      source: 'webview',
                    },
                  },
                ],
              });
            },
          },
        ]);

        break;
      case MessageType.detail:
        const {data} = obj;
        ToDetail({id: data.id});
        break;
      case MessageType.refreshRiderInfo:
        DeviceEventEmitter.emit('refreshStatus');
        break;
      case MessageType.identify:
        props.navigation.goBack();
        DeviceEventEmitter.emit('refreshStatus');
        break;
    }
  };

  return (
    <WebView
      ref={webViewRef}
      style={styles.bgContainer}
      source={{uri: url, headers: {'Cache-Control': 'no-cache'}}}
      injectedJavaScript={injectedJS}
      onMessage={onMessageHandle}
      onNavigationStateChange={handleWebViewNavigationStateChange}
    />
  );
};

const styles = StyleSheet.create({
  backButton: {
    height: 40,
    width: 40,
    display: 'flex',
    justifyContent: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  bgContainer: {
    backgroundColor: '#1677FE',
  },
});

export default WebPage;
