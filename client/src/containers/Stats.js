import React from 'react';
import SInfo from 'react-native-sensitive-info';
import {Text, View, Button} from 'react-native';

import style from '../styles/main';

import Auth0 from '../utils/auth0';

export default ({navigation}) => {
  const _logOut = async () => {
    SInfo.deleteItem('accessToken', {});
    SInfo.deleteItem('refreshToken', {});
    try {
      await Auth0.webAuth.clearSession();
    } catch (error) {
      console.error(error);
    }

    navigation.navigate('Auth');
  };

  return (
    <View style={style.background}>
      <Text style={style.largeHeaderText}>Stats</Text>
      <Button title={'Sign out'} onPress={_logOut} />
    </View>
  );
};
