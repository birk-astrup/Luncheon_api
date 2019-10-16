/* eslint-disable react-hooks/rules-of-hooks */
import {useState} from 'react';
import {createContainer} from 'unstated-next';

import Auth0 from './utils/auth0';
import SInfo from 'react-native-sensitive-info';

const calendarReducer = (datesInit = []) => {
  let [dateList, setDateList] = useState(datesInit);
  let setDates = dates => setDateList(dates);
  let removeDates = () => setDateList([]);
  return {setDates, removeDates, dateList};
};

// Getting user data from auth0
// @TODO change for azure AD
const userReducer = (initUser = {nickname: '', email: '', userId: ''}) => {
  const [user, setUser] = useState(initUser);
  const [isUserFetched, setIsUserFetched] = useState(false);

  const fetchUser = async () => {
    try {
      const token = await SInfo.getItem('accessToken', {});
      const u = await Auth0.auth.userInfo({token});
      const userId = u.sub.split('|')[1];

      setIsUserFetched(true);
      console.log(u);

      setUser({
        nickname: u.nickname,
        email: u.email,
        userId,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return {user, isUserFetched, fetchUser};
};

export const calendarContainer = createContainer(calendarReducer);
export const userContainer = createContainer(userReducer);
