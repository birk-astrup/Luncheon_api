import {useState} from 'react';
import {createContainer} from 'unstated-next';

const userReducer = userDetails => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let [user, setUserDetails] = useState({});
  let setUser = () => setUserDetails(userDetails);
  let removeUser = () => setUserDetails({});
  return {user, setUser, removeUser};
};

export default createContainer(userReducer);
