import React, {memo} from 'react';

import './Period.scss'
import {PERIOD, CURRENCY, INCOME_THIS_MONTH, USERS_THIS_MONTH, EXPORT} from '../../constants/constants';

export default memo(({amountOfUsers = 0, amountOfPayments = 0}) => (
  <>
    <div className="period-headline">
      <div>
        <h2 className="primary-title">{PERIOD}</h2>
        <h3 className="primary-subtitle">1.10.2019 - 31.10.2019</h3>
      </div>

      <button className="period-headline-button">{EXPORT}</button>
    </div>
    
    {/* Statistics */}
    <div className="period-box">
      {/* Inntekt */}
      <div>
        <h1 className="big-title">{amountOfPayments * 40} {CURRENCY}</h1>
        <p className="primary-subtitle">{INCOME_THIS_MONTH}</p>
      </div>

      <span className="period-divider"></span>

      {/* Brukere */}
      <div>
        <h1 className="big-title">{amountOfUsers}</h1>
        <p className="primary-subtitle">{USERS_THIS_MONTH}</p>
      </div>
    </div>
  </>
))