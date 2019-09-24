import React from 'react';
import {View, Button, AsyncStorage, StyleSheet, Alert} from 'react-native';
import {
  AUTHO_SCOPE,
  AUTH0_AUDIENCE,
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
} from 'react-native-dotenv';
import Auth0 from 'react-native-auth0';

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

  const _signInAsync = () => {
    new Auth0({
      clientId: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN,
    }).webAuth
      .authorize({
        scope: AUTHO_SCOPE,
        audience: AUTH0_AUDIENCE,
      })
      .then(cred => {
        console.log(cred);
        Alert.alert(
          'Success',
          'AccessToken: ' + cred.accessToken,
          [
            {
              text: 'OK',
              onPress: () => _navigateToApp(),
            },
          ],
          {cancelable: false},
        );
      })
      .catch(err => console.log(err));

    // AsyncStorage.setItem('userToken', credentials.accessToken);
  };

  return (
    <View style={styles.container}>
      <Button title="Sign in!" onPress={_signInAsync} />
    </View>
  );
};
