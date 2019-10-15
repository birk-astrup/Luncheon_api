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
  const calendarInformation = calendarContainer.useContainer();

  // format date
  const today = new Date();
  const formattedTodaysDate = formatDate(today);

  const [registerLunch] = useMutation(REGISTER_LUNCH, {
    variables: {
      nickname: userInformation.user.nickname,
      email: userInformation.user.email,
    },
    refetchQueries: ['getUser'],
  });

  const [getTimestamps, {called, loading, data}] = useLazyQuery(
    TIMESTAMP_QUERY,
    {
      variables: {
        nickname: userInformation.user.nickname,
        email: userInformation.user.email,
      },
    },
  );

  // Recives data from scanner and registers lunch
  useEffect(() => {
    const dataFromQR = navigation.getParam('data', 'No data recived');
    if (dataFromQR === 'www.netcompany.com') {
      userInformation.isUserFetched && registerLunch();
      getTimestamps();
    }
  }, [getTimestamps, navigation, registerLunch, userInformation.isUserFetched]);

  // Fetches timestamps using LazyQuery
  useEffect(() => {
    if (userInformation.isUserFetched) {
      if (!loading && !called) {
        getTimestamps();
      } else if (!loading && called) {
        if (data && data.user.user.length > 0) {
          const reg = data.user.user[0].registered
            ? data.user.user[0].registered
            : [];

          calendarInformation.setDates(reg);

          for (let item of reg) {
            formatDate(item) === formattedTodaysDate && setHasPaid(true);
          }
        }
      }
    }
  }, [
    calendarInformation,
    called,
    data,
    formattedTodaysDate,
    getTimestamps,
    loading,
    userInformation.isUserFetched,
  ]);

  // Mounting cycle for fetching user
  useEffect(() => {
    userInformation.fetchUser();
  }, [userInformation]);

  return (
    <View style={homeStyle.container}>
      <View style={homeStyle.wrapper}>
        {userInformation.isUserFetched && (
          <Text style={style.largeHeaderText}>
            God morgen, {userInformation.user.nickname}
          </Text>
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
