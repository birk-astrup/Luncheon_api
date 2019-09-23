import React from 'react';
import {Text, View, Button, AsyncStorage} from 'react-native';

import style from '../styles/main';

export default ({navigation}) => {
  const _logOut = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Auth');
  };

  return (
    <View style={style.background}>
      <Text style={style.largeHeaderText}>Stats</Text>
      <Button title={'Sign out'} onPress={_logOut} />
    </View>
  );
};
