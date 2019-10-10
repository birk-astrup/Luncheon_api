import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {handleCalendarFormating} from '../utils/calendarUtils';

import DataStore from '../store';

import style from '../styles/main';

const _style = StyleSheet.create({
  container: {
    ...style.background,
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    padding: 45,
  },
});

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Uses date.getMonth()
const date = new Date();

export default () => {
  const [calendarDates, setCalendarDates] = useState({});
  const storage = DataStore.useContainer();
  useEffect(() => {
    let dates = storage.dateList;
    if (dates.length > 0) {
      let formatedDates = handleCalendarFormating(dates);
      setCalendarDates(formatedDates);
    }
  }, [storage.dateList]);

  return (
    <View style={_style.container}>
      <Text style={style.largeHeaderText}>{monthNames[date.getMonth()]}</Text>
      <Calendar
        theme={{
          calendarBackground: 'rgba(0,0,0,0.0)',
          dayTextColor: '#FFFFFF',
          textDisabledColor: '#525252',
        }}
        markedDates={calendarDates}
        onDayPress={day => {
          console.log('selected day', day);
        }}
        markingType={'period'}
        hideArrows={true}
        hideDayNames={true}
        monthFormat={''}
        disableMonthChange={true}
      />
    </View>
  );
};
