import React from 'react';
import { View, Text } from 'react-native';
import { ToastConfig } from 'react-native-toast-message';

export const toastConfig: ToastConfig = {

  netError: ({ text1, text2, props }) => (
    <View style={{ height: 50, width: '95%', backgroundColor: props.colors.accentColorLight, borderRadius: 5, alignItems: 'center', justifyContent: 'center', top: -30 }}>
      <Text numberOfLines={1} style={{ color: props.colors.regularText, fontSize: 12, fontWeight: '500' }}>{text1}</Text>
      <Text numberOfLines={1} style={{ color: props.colors.subText, fontSize: 10 }}>{text2}</Text>
    </View>
  )
};