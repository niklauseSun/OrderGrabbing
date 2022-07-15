import React, {useRef, useState} from 'react';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
const WebPage = props => {
  console.log('props', props);
  const {route, navigation} = props;
  const {params} = route;
  const {url, token} = params;
  const webViewRef = useRef();
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
        // <Button
        //   onPress={() => {
        //     console.log('webRef', webViewRef.current);

        //     if (canGoBack) {
        //       webViewRef.current.goBack();
        //     } else {
        //       navigation.goBack();
        //     }
        //   }}>
        //   返回
        // </Button>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            console.log('webRef', webViewRef.current);

            if (canGoBack) {
              webViewRef.current.goBack();
              webViewRef.current.reload();
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

  return (
    <WebView
      ref={webViewRef}
      source={{uri: url}}
      onMessage={event => {
        console.log('event', event);
      }}
      onLoadEnd={res => {
        console.log('res', res.nativeEvent);
      }}
      injectedJavaScript={injectedJS}
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
