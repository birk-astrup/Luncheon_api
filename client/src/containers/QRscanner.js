import React, {useRef} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

// https://blog.hackajob.co/how-to-build-a-qrcode-reader-using-reactnative/
import QR from 'react-native-qrcode-scanner';

const style = StyleSheet.create({
  container: {},
});

export default ({navigation}) => {
  const scanner = useRef(null);

  const onSuccess = async event => {
    await navigation.navigate('Home', {
      data: event.data,
      scanner,
    });
  };

  return (
    <View style={style.container}>
      <QR
        onRead={onSuccess}
        showMarker={true}
        checkAndroid6Permissions={true}
        ref={scanner}
        cameraStyle={{height: Dimensions.get('window').height}}
      />
    </View>
  );
};
