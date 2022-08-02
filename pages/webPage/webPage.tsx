import React, {useRef, useState} from 'react';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {
  DeviceEventEmitter,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToDetail from '../../utils/ToDetail';

const MessageType = {
  logout: 'logout',
  detail: 'detail',
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

  const handleWebViewNavigationStateChange = (
    nativeNavigation: WebViewNavigation,
  ) => {
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
              webViewRef.current && webViewRef.current.reload();
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
      window.localStorage.setItem('userPhone', '${mobilePhone || ''}')
    })();
  `;

  const onMessageHandle = (e: any) => {
    console.log('onMessage', e.nativeEvent.data);
    const str = e.nativeEvent.data;
    const obj = JSON.parse(str);

    switch (obj.type) {
      case MessageType.closeWebview:
        props.navigation.goBack();
        break;
      case MessageType.logout:
        AsyncStorage.setItem('localToken', '').then(() => {
          props.navigation.popToTop();
          props.navigation.replace('Login', {
            source: 'webview',
          });
        });
        break;
      case MessageType.detail:
        const {data} = obj;
        ToDetail(data.id);
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
      onLoadEnd={res => {
        console.log('res', res.nativeEvent);
      }}
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
