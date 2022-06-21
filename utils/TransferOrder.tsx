import React from 'react';
import {Modal} from '@ant-design/react-native';
import Input from '@ant-design/react-native/lib/input-item/Input';
import {TouchableOpacity, View, Text} from 'react-native';

const TransferOrder = () => {
  Modal.alert(
    '转单原因',
    <View>
      <Input placeholder="转单原因填写" maxLength={20} />
      <View>
        <TouchableOpacity>
          <Text>紧急转单</Text>
        </TouchableOpacity>
      </View>
    </View>,
    [
      {text: '取消', onPress: () => console.log('cancel')},
      {text: '确认', onPress: () => console.log('ok')},
    ],
  );
};

export default TransferOrder;
