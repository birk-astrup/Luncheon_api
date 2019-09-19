import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

import style from '../styles/main';

const _style = StyleSheet.create({
  box: {
    height: 90,
    width: 90,
    borderRadius: 5,
    backgroundColor: '#E46053',
    left: '50%',
    transform: [{translateX: -45}],
  },
  checkmark: {
    height: 45,
    width: 45,
    left: '50%',
    transform: [{translateX: -22.5}],
  },
  container: {
    ...style.background,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    paddingLeft: 65,
    paddingRight: 65,
  },
  redHeaderText: {
    ...style.largeHeaderText,
    ...style.redText,
  },
  greenHeaderText: {
    ...style.largeHeaderText,
    ...style.greenText,
  },
  wrapper: {
    position: 'relative',
    height: 375,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default ({navigation}) => {
  const [data, setData] = useState(null);
  const [hasPaid, setHasPaid] = useState(false);

  // Recives data from scanner
  useEffect(() => {
    const dataFromQR = navigation.getParam('data', 'No data recived');
    setData(dataFromQR);
  }, [navigation]);

  // Mounting cycle
  useEffect(() => {
    data === 'www.netcompany.com' && setHasPaid(true);
  }, [data]);

  return (
    <View style={_style.container}>
      <View style={_style.wrapper}>
        <Text style={style.largeHeaderText}>God morgen, </Text>

        {!hasPaid ? (
          <>
            <Text style={_style.redHeaderText}>bekreft lunsj med QR</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('QRscanner')}
              style={_style.box}>
              <Icon name={'qrcode'} size={90} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={_style.greenHeaderText}>lunsj bekreftet</Text>
            <View style={_style.checkmark}>
              <Icon name={'checkcircle'} size={45} color={'#5CBDAA'} />
            </View>
          </>
        )}
      </View>
    </View>
  );
};
