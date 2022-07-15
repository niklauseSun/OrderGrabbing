import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  useCameraDevices,
  Camera,
  useFrameProcessor,
} from 'react-native-vision-camera';

const CameraPage = () => {
  const devices = useCameraDevices('wide-angle-camera');
  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const qrCodes = scanQRCodes(frame);
    console.log(`QR Codes in Frame: ${qrCodes}`);
  }, []);

  const deivce = devices.back;
  if (!deivce) {
    return <Text>加载中</Text>;
  }
  return (
    <Camera
      frameProcessor={frameProcessor}
      style={StyleSheet.absoluteFill}
      device={deivce}
      isActive={true}
    />
  );
};
export default CameraPage;

export function scanQRCodes(frame: Frame) {
  'worklet';
  return scanQRCodes(frame);
}
