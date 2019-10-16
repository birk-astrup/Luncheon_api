import React, {useEffect, useState} from 'react';
import {useLazyQuery, useMutation} from '@apollo/react-hooks';
import Icon from 'react-native-vector-icons/AntDesign';
import {Text, View, TouchableOpacity} from 'react-native';

import style from '../styles/main';
import homeStyle from '../styles/homeStyles';

import TIMESTAMP_QUERY from '../queries/getTimestamps';
import REGISTER_LUNCH from '../mutations/registerLunch';

import {formatDate} from '../utils/calendarUtils';
import {userContainer, calendarContainer} from '../store';

export default ({navigation}) => {
  const [hasPaid, setHasPaid] = useState(false);
  const userInformation = userContainer.useContainer();
  const calendar = calendarContainer.useContainer();
  const {isUserFetched, fetchUser, user} = userInformation;

  // format date
  const today = new Date();
  const formattedTodaysDate = formatDate(today);

  const [registerLunch] = useMutation(REGISTER_LUNCH);

  const [getTimestamps, {data, called, loading}] = useLazyQuery(
    TIMESTAMP_QUERY,
  );

  useEffect(() => {
    if (called && !loading) {
      if (data && data.user.user) {
        const registeredLunches = data.user.user[0].registered;
        if (registeredLunches.length > 0) {
          calendar.setDates(data.user.user[0].registered);

          for (let item of registeredLunches) {
            item.timestamp === formattedTodaysDate && setHasPaid(true);
          }
        } else {
          calendar.setDates([]);
        }
      }
    }
  }, [calendar, called, data, formattedTodaysDate, loading, user]);

  // Recives data from scanner and registers lunch
  useEffect(() => {
    const dataFromQR = navigation.getParam('data', 'No data recived');
    if (dataFromQR === 'www.netcompany.com') {
      isUserFetched &&
        registerLunch({
          variables: {
            id: user.userId,
            nickname: user.nickname,
            email: user.email,
          },
          refetchQueries: ['getUser'],
        });
    }
  }, [isUserFetched, navigation, registerLunch, user]);

  // Fires once
  useEffect(() => {
    fetchUser();
    // Needs to be like this to not fire 600 times.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    isUserFetched && getTimestamps({variables: {id: user.userId}});
  }, [getTimestamps, isUserFetched, user.userId]);

  return (
    <View style={homeStyle.container}>
      <View style={homeStyle.wrapper}>
        {isUserFetched && (
          <Text style={style.largeHeaderText}>God morgen, {user.nickname}</Text>
        )}

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
