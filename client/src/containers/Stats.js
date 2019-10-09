import React, {useEffect} from 'react';
import SInfo from 'react-native-sensitive-info';
import {Text, View, Button} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';

import style from '../styles/main';

import Auth0 from '../utils/auth0';

export default ({navigation}) => {
  const USER_QUERY = gql`
    query GetAllQueries {
      getUsers {
        id
        email
      }
    }
  `;
  const everything = useQuery(USER_QUERY);

  const _logOut = async () => {
    SInfo.deleteItem('accessToken', {});
    SInfo.deleteItem('refreshToken', {});
    SInfo.deleteItem('idToken', {});
    try {
      await Auth0.webAuth.clearSession();
    } catch (error) {
      console.error(error);
    }

    navigation.navigate('Auth');
  };

  useEffect(() => {
    console.log(everything);
  }, [everything]);

  return (
    <View style={style.background}>
      <Text style={style.largeHeaderText}>Stats</Text>
      <Button title={'Sign out'} onPress={_logOut} />
    </View>
  );
};
