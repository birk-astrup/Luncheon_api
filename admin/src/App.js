import React from 'react';

import Header from './components/Header/Header';
import Container from './components/Container/Container';

import Period from './components/Period/Period';
import MonthPicker from './components/MonthPicker/MonthPicker';

import './style/main.scss';
import Purchases from './components/Purchases/Purchases';
import { useQuery } from '@apollo/react-hooks';
import GET_USERS from './queries/getUsers';

function App() {
  const { data } = useQuery(GET_USERS)

  const monthPicked = (monthPicked) => {
    
  }

  return (
    <div className="App">
      <Header/>

      <Container>
        <Period />
        <MonthPicker monthPicked={monthPicked} />
        <Purchases />
      </Container>
    </div>
  );
}

export default App;
