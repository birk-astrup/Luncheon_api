import React from 'react';
import './Header.scss';
import {TITLE} from '../../constants/constants';

export default () => (
  <header className="header">
    <h1 className="header-title">{TITLE}</h1>
  </header>
)