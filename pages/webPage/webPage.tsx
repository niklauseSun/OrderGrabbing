import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useRef} from 'react';
import WebView, {WebViewNavigation} from 'react-native-webview';
const WebPage = async props => {
  console.log('props', props);
  const {route} = props;
  const {params} = route;
  const {url} = params;
  const webViewRef = useRef();

  const handleWebViewNavigationStateChange = (
    nativeNavigation: WebViewNavigation,
  ) => {
    console.log('nativeEvent', nativeNavigation);
    const {navigationType, canGoBack} = nativeNavigation;
    if (navigationType === 'backforward' && canGoBack) {
    }
  };

  const token = await AsyncStorage.getItem('token');

  const injectedJS = `
    (function() {
      window.localStorage.setItem('token', ${token});
      window.location.reload()
    })();
  `;

  return (
    <WebView
      ref={() => webViewRef}
      source={{uri: url}}
      onMessage={event => {
        console.log('event', event);
      }}
      injectedJavaScript={injectedJS}
      onNavigationStateChange={handleWebViewNavigationStateChange}
    />
  );
};

export default WebPage;
