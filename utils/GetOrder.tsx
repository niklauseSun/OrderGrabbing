import React from 'react';
import {Modal, Button} from '@ant-design/react-native';
import LocationInfo from '../components/LocationInfo';

const GetOrder = (props: any) => {
  console.log('visible', props);
  const footerButtons = [
    {text: '取消', onPress: () => console.log('cancel')},
    {text: '确认抢单', onPress: () => console.log('ok')},
  ];
  Modal.alert('', <LocationInfo />, []);
};

export default GetOrder;
