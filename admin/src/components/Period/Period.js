import React from 'react';

import './Period.scss'

export default () => (
  <>
    <div className="period-headline">
      <div>
        <h2 className="primary-title">Period</h2>
        <h3 className="primary-subtitle">1.10.2019 - 31.10.2019</h3>
      </div>

      <button className="period-headline-button">export to excel</button>
    </div>
    
    {/* Statistics */}
    <div className="period-box">
      {/* Inntekt */}
      <div>
        <h1 className="big-title">1440 NOK</h1>
        <p className="primary-subtitle">Total inntekt fra lunsj</p>
      </div>

      <span className="period-divider"></span>

      {/* Brukere */}
      <div>
        <h1 className="big-title">4</h1>
        <p className="primary-subtitle">Brukere denne måned</p>
      </div>
    </div>
  </>
)