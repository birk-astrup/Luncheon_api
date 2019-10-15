import React from 'react';

import './Purchases.scss';
import {AMOUNT_OF_PURCHASES} from '../../constants/constants';

export default () => (
  <>
    <h2 className="primary-title">{AMOUNT_OF_PURCHASES} (35)</h2>
    <div>
      <div className="purchases-table-box">
        <p className="primary-subtitle">blabla</p>
        <p className="primary-subtitle">blabla@gg.com</p>
        <p className="primary-subtitle primary-subtitle--bold">12</p>
        <i>edit</i>
      </div>
    </div>
  </>
)