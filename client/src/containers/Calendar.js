import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {handleCalendarFormating} from '../utils/calendarUtils';

import {calendarContainer} from '../store';

import style from '../styles/main';
import CalendarAlert from '../components/CalendarAlert';

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
  const calendar = calendarContainer.useContainer();

  useEffect(() => {
    let dates = calendar.dateList;
    if (dates.length > 0) {
      let formatedDates = handleCalendarFormating(dates);
      setCalendarDates(formatedDates);
    }
  }, [calendar]);

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
        onDayPress={day => CalendarAlert(day)}
        markingType={'period'}
        hideArrows={true}
        hideDayNames={true}
        monthFormat={''}
        disableMonthChange={true}
      />
    </View>
  );
};
