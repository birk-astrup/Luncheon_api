import {MONTH_NAMES} from '../constants/constants';

export const calculateResultForMonth = (users, month) => {
  const userArray = [];
  
  for (let m in MONTH_NAMES) {
    if (MONTH_NAMES[m] === month) {
      // Loop through users
      for(let user in users) {
        const tempUser = {
          nickname: user.nickname,
          email: user.email,
          registered: []
        }

        for (let timestamp in user.registered) {
          const date = new Date(timestamp);
          date.getMonth() === m && tempUser.registered.push(timestamp);
        }

        tempUser.registered.length > 0 && userArray.push(tempUser);
      }
    }
  }

  return userArray;
}