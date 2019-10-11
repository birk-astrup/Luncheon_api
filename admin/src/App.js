import React from 'react';

import Header from './components/Header/Header';
import Container from './components/Container/Container';

import Period from './components/Period/Period';
import MonthPicker from './components/MonthPicker/MonthPicker';

import './style/main.scss';
import Purchases from './components/Purchases/Purchases';

function App() {
  return (
    <div className="App">
      <Header/>

      <Container>
        <Period />
        <MonthPicker />
        <Purchases />
      </Container>
    </div>
  );
}

export default App;
