import React from 'react';
import {StyleSheet} from 'react-native';
import {useCameraDevices, Camera} from 'react-native-vision-camera';

const CameraPage = async () => {
  const devices = useCameraDevices();
  const deivce = devices.back;
  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
};
export default CameraPage;
