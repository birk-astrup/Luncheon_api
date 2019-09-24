import React, {useEffect, useState} from 'react';
import SInfo from 'react-native-sensitive-info';
import DeviceInfo from 'react-native-device-info';
import RNRestart from 'react-native-restart';
import {AUTHO_SCOPE, AUTH0_AUDIENCE} from 'react-native-dotenv';
import {View, Button, StyleSheet, ActivityIndicator, Text} from 'react-native';

import Auth0 from '../utils/auth0';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B222E',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 48,
    fontFamily: 'RobotoSlab-Bold',
  },
  headerSub: {
    color: '#DE9C2B',
    fontSize: 36,
    fontFamily: 'RobotoSlab-Bold',
  },
  loginButton: {
    color: '#000000',
    backgroundColor: '#FFFFFF',
    fontSize: 36,
    padding: 10,
  },
});

export default ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);

  const _refreshAccessToken = () => {
    SInfo.getItem('refreshToken', {}).then(refreshToken => {
      Auth0.auth
        .refreshToken({refreshToken: refreshToken})
        .then(newAccessToken => {
          SInfo.setItem('accessToken', newAccessToken);
          RNRestart.Restart();
        })
        .catch(_ => setIsLoading(false));
    });
  };

  const _navigateToApp = (accessToken, refresh) => {
    Auth0.auth
      .userInfo({token: accessToken})
      .then(async user => {
        try {
          navigation.navigate('App');
        } catch (error) {
          console.error(error);
        }
      })
      .catch(refresh);
  };

  const _login = async () => {
    try {
      const {accessToken, refreshToken} = await Auth0.webAuth.authorize({
        scope: AUTHO_SCOPE,
        audience: AUTH0_AUDIENCE,
        device: DeviceInfo.getUniqueId(),
      });

      // Safe storage
      SInfo.setItem('accessToken', accessToken, {});
      SInfo.setItem('refreshToken', refreshToken, {});

      _navigateToApp(accessToken);
    } catch (error) {
      console.error('Login error', error);
    }
  };

  useEffect(() => {
    SInfo.getItem('accessToken', {}).then(accessToken => {
      if (accessToken) {
        _navigateToApp(accessToken, _refreshAccessToken);
      } else {
        setIsLoading(false);
      }
    });
  });

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#FFFFFF" animating={isLoading} />
      ) : (
        <>
          <Text style={styles.headerTitle}>Netcompany</Text>
          <Text style={styles.headerSub}>Luncheon</Text>
          <Button title="Sign in" onPress={_login} />
        </>
      )}
    </View>
  );
};
