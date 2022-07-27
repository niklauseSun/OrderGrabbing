import React, {useRef, useState} from 'react';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Identify from '../../utils/Identify';
const WebPage = props => {
  console.log('props', props);
  const {route, navigation} = props;
  const {params} = route;
  const {url, token} = params;
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  const handleWebViewNavigationStateChange = (
    nativeNavigation: WebViewNavigation,
  ) => {
    console.log('nativeEvent', nativeNavigation);
    const {title, canGoBack: canGo} = nativeNavigation;
    navigation.setOptions({title: title});
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
            source={require('./assets/header_back.png')}
          />
        </TouchableOpacity>
      ),
    });
  }, [canGoBack, navigation]);

  const injectedJS = `
    (function() {
      window.localStorage.setItem('token', '${token}');
    })();
  `;

  const onMessageHandle = (e: any) => {
    const str = e.nativeEvent.data;
    const data = JSON.parse(str);

    if (data.type === 'closeWebView') {
      props.navigation.goBack();
    } else if (data.type === 'logout') {
      AsyncStorage.setItem('localToken', '').then(() => {
        Identify(false);
      });
    }
  };

  return (
    <WebView
      ref={webViewRef}
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
});

export default WebPage;
