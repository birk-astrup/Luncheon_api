import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {handleCalendarFormating} from '../utils/calendarUtils';

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

export default () => (
  <View style={_style.container}>
    <Text style={style.largeHeaderText}>{monthNames[date.getMonth()]}</Text>
    <Calendar
      theme={{
        calendarBackground: 'rgba(0,0,0,0.0)',
        dayTextColor: '#FFFFFF',
        textDisabledColor: '#525252',
      }}
      markedDates={{
        '2019-09-22': {startingDay: true, color: '#5CBDAA'},
        '2019-09-23': {
          selected: true,
          endingDay: true,
          color: '#5CBDAA',
        },
      }}
      markingType={'period'}
      hideArrows={true}
      hideDayNames={true}
      monthFormat={''}
      disableMonthChange={true}
    />
  </View>
);
