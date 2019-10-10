import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import Icon from 'react-native-vector-icons/AntDesign';
import {Text, View, TouchableOpacity} from 'react-native';

import style from '../styles/main';
import homeStyle from '../styles/homeStyles';

import Auth0 from '../utils/auth0';
import SInfo from 'react-native-sensitive-info';

import DateStore from '../store';

import timestampQuery from '../queries/getTimestamps';

import {formatDate} from '../utils/calendarUtils';

export default ({navigation}) => {
  const [name, setName] = useState(null);
  const [hasPaid, setHasPaid] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  // format date
  const today = new Date();
  const formattedTodaysDate = formatDate(today);

  const query = useQuery(timestampQuery);

  console.log(query);
  // Store usage
  const storage = DateStore.useContainer();

  const getName = async () => {
    try {
      const token = await SInfo.getItem('accessToken', {});
      const user = await Auth0.auth.userInfo({token});
      setName(user.nickname);
    } catch (err) {
      console.error(err);
    }
  };

  // Recives data from scanner
  useEffect(() => {
    const dataFromQR = navigation.getParam('data', 'No data recived');
    dataFromQR === 'netcompany' && setHasPaid(true);
  }, [navigation]);

  useEffect(() => {
    // @TODO fetch dates to state
    if (!hasFetched) {
      if (query.data && query.data.length > 0) {
        storage.setDates(query.data);

        for (let item in query.data) {
          if (formatDate(item.registered) === formattedTodaysDate) {
            setHasPaid(true);
          }
        }
      }

      setHasFetched(true);
    }
  }, [formattedTodaysDate, hasFetched, query.data, storage]);

  // Mounting cycle
  useEffect(() => {
    getName();
  }, []);

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
