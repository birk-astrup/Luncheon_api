import {useState} from 'react';
import {createContainer} from 'unstated-next';

const calendarReducer = (datesInit = []) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let [dateList, setDateList] = useState(datesInit);
  let setDates = dates => setDateList(dates);
  let removeDates = () => setDateList([]);
  return {setDates, removeDates, dateList};
};

export default createContainer(calendarReducer);
