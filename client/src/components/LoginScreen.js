import React from 'react';
import {View, Button, AsyncStorage, StyleSheet, Alert} from 'react-native';

import Auth0 from '../utils/auth';
import {AUTHO_SCOPE, AUTH0_AUDIENCE} from 'react-native-dotenv';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ({navigation}) => {
  const _navigateToApp = () => {
    navigation.navigate('App');
  };

  const _signInAsync = async () => {
    console.log(AUTHO_SCOPE, AUTH0_AUDIENCE);
    try {
      let credentials = await Auth0.webAuth.authorize({
        scope: AUTHO_SCOPE,
        audience: AUTH0_AUDIENCE,
      });

      console.log(credentials);

      if (credentials) {
        Alert.alert(
          'Success',
          'AccessToken: ' + credentials.accessToken,
          [
            {
              text: 'OK',
              onPress: () => _navigateToApp(),
            },
          ],
          {cancelable: false},
        );
        await AsyncStorage.setItem('userToken', credentials.accessToken);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Sign in!" onPress={_signInAsync} />
    </View>
  );
};
