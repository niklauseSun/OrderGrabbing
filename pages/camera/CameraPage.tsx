import {Toast} from '@ant-design/react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import upload from '../../api/upload';

const CameraPage = (props: any) => {
  console.log('cameraPage', props);
  const devices = useCameraDevices('wide-angle-camera');
  const [path, setPath] = useState('');

  const {callBack} = props.route.params;

  const camera = useRef<Camera>(null);
  const deivce = devices.back;

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  }, []);

  if (!deivce) {
    return <Text>加载中</Text>;
  }

  if (path) {
    return (
      <View style={StyleSheet.absoluteFill}>
        <Image style={StyleSheet.absoluteFill} source={{uri: path}} />
        <View style={styles.cancelView}>
          <Text>取消</Text>
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={() => {
              Toast.loading({
                content: '保存中',
              });
              const file = {
                uri: path,
                type: 'application/octet-stream',
                name: 'image.jpg',
              };
              let formData = new FormData();
              formData.append('file', file);
              console.log('file', file);
              upload.uploadImage(formData).then(ret => {
                console.log('res', ret);
                const {success, result} = ret;
                if (success) {
                  if (callBack) {
                    callBack(result);
                  }
                  props.navigation.goBack();
                } else {
                  Toast.info({
                    content: ret.message,
                  });
                }
              });
            }}>
            <Text style={styles.saveText}>保存</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={StyleSheet.absoluteFill}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={deivce}
        isActive={true}
        photo={true}
      />
      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => {
            camera.current &&
              camera.current.takePhoto().then(res => {
                setPath('file://' + res.path);
              });
          }}
          style={styles.captureButton}>
          <Image
            style={styles.takePic}
            source={require('./assets/take_pic.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CameraPage;

const styles = StyleSheet.create({
  bottomView: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  cancelView: {
    position: 'absolute',
    top: 20,
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  captureButton: {
    borderWidth: 3,
    padding: 10,
    borderRadius: 45,
    height: 90,
    width: 90,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#1296db',
  },
  takePic: {
    width: 60,
    height: 60,
  },
  saveText: {
    fontSize: 20,
    color: '#1296db',
  },
});
