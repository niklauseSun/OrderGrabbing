import React from 'react';
import {
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import BottomAction from './components/bottomAction';

const Detail = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.innerContainer}>
        <BottomAction />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
    height: '100%',
  },
  wxButton: {
    marginLeft: 20,
    marginRight: 20,
    height: 45,
    borderRadius: 10,
    backgroundColor: '#54B937',
    borderColor: '#54B937',
    width: 330,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneButton: {
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    backgroundColor: '#1677FE',
    height: 45,
    fontSize: 15,
    width: 330,
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
  },
  helloImage: {
    width: 120,
    height: 120,
    backgroundColor: 'red',
    marginTop: 100,
    marginBottom: 70,
  },

  logo: {
    marginTop: 120,
    marginBottom: 100,
    backgroundColor: 'red',
    width: 90,
    height: 90,
  },
});

export default Detail;
