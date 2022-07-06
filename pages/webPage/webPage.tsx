import React, {useRef} from 'react';
import WebView, {WebViewNavigation} from 'react-native-webview';
const WebPage = props => {
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

  return (
    <WebView
      ref={() => webViewRef}
      source={{uri: url}}
      onMessage={event => {
        console.log('event', event);
      }}
      onNavigationStateChange={handleWebViewNavigationStateChange}
    />
  );
};

export default WebPage;
