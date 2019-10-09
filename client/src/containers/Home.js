import React, {useEffect, useState} from 'react';
// import {useQuery} from '@apollo/react-hooks';
import Icon from 'react-native-vector-icons/AntDesign';
import {Text, View, TouchableOpacity} from 'react-native';

import style from '../styles/main';
import homeStyle from '../styles/homeStyles';

import Auth0 from '../utils/auth0';
import SInfo from 'react-native-sensitive-info';

import DateStore from '../store';

export default ({navigation}) => {
  const [name, setName] = useState(null);
  const [data, setData] = useState(null);
  const [hasPaid, setHasPaid] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  // Store usage
  const storage = DateStore.useContainer();

  const getName = async () => {
    const token = await SInfo.getItem('accessToken', {});
    const user = await Auth0.auth.userInfo({token});
    try {
      setName(user.nickname);
    } catch (err) {
      console.error(err);
    }
  };

  // Recives data from scanner
  useEffect(() => {
    const dataFromQR = navigation.getParam('data', 'No data recived');
    setData(dataFromQR);
  }, [navigation]);

  // useEffect(() => {
  //   // @TODO fetch dates to state
  //   if (!hasFetched) {
  //     const query = useQuery();
  //     storage.setDates(query.data);
  //     setHasFetched(true);
  //   }
  // }, [hasFetched, storage]);

  // Mounting cycle
  useEffect(() => {
    data === 'netcompany' && setHasPaid(true);
    getName();
  }, [data]);

  return (
    <View style={homeStyle.container}>
      <View style={homeStyle.wrapper}>
        <Text style={style.largeHeaderText}>God morgen, {name}</Text>

        {!hasPaid ? (
          <>
            <Text style={homeStyle.redHeaderText}>bekreft lunsj med QR</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('QRscanner')}
              style={homeStyle.box}>
              <Icon name={'qrcode'} size={90} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={homeStyle.greenHeaderText}>lunsj bekreftet</Text>
            <View style={homeStyle.checkmark}>
              <Icon name={'checkcircle'} size={45} color={'#5CBDAA'} />
            </View>
          </>
        )}
      </View>
    </View>
  );
};
