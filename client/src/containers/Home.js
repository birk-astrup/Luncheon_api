import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

import style from '../styles/main';

const _style = StyleSheet.create({
  box: {
    height: 90,
    width: 90,
    borderRadius: 5,
    backgroundColor: '#E46053',
    position: 'absolute',
    left: '50%',
    transform: [{translateX: -50}],
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
  wrapper: {
    height: 375,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default () => (
  <View style={_style.container}>
    <View style={_style.wrapper}>
      <Text style={style.largeHeaderText}>God morgen, </Text>
      <Text style={_style.redHeaderText}>bekreft lunsj med QR</Text>

      <TouchableOpacity>
        <View style={_style.box}>
          <Icon name={'qrcode'} size={90} />
        </View>
      </TouchableOpacity>
    </View>
  </View>
);
