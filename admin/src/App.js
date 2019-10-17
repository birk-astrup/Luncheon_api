import React, {useState, useEffect} from 'react';
import {useLazyQuery} from '@apollo/react-hooks';

import Dialog from './components/Dialog/Dialog';
import Header from './components/Header/Header';
import Period from './components/Period/Period';
import Container from './components/Container/Container';
import Purchases from './components/Purchases/Purchases';
import MonthPicker from './components/MonthPicker/MonthPicker';

import GET_USERS from './queries/getUsers';
import {calculateResultForMonth} from './utils/calculations';

import './style/main.scss';

function App() {
  const [userData, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState('January');
  const [information, setInformation] = useState([])
  const [getUsers, {data, loading, called}] = useLazyQuery(GET_USERS)

  const openUserDialog = (user) => {
    setIsOpen(!isOpen);
    setUser(user);
  }

  // Gets users on entry 
  useEffect(() => {
    !loading && !called && getUsers()
  }, [called, getUsers, loading]);

  // Sorting users when data is recieved
  useEffect(() => {
    const sortedUsersByMonth = !loading && called && data && calculateResultForMonth(data, month);
    setInformation(sortedUsersByMonth);
  }, [called, data, loading, month]);

  return (
    <div className="App">
      <Header/>
      <Container>
        {information.users && 
        <>
          <Period amountOfPayments={information.payments} amountOfUsers={information.users.length}/>
          <MonthPicker monthPicked={m => setMonth(m)} />
          <Purchases openUserDialog={openUserDialog} info={information}/> 
        </>
      }
      </Container>

      {isOpen && <Dialog setIsOpen={setIsOpen} user={userData}/>}
    </div>
  );
}

export default App;
