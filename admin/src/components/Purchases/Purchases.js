import React from 'react';

import './Purchases.scss';
import {AMOUNT_OF_PURCHASES} from '../../constants/constants';

export default ({info}) => (
  <>
    <h2 className="primary-title">{AMOUNT_OF_PURCHASES} ({info.payments})</h2>
    <div>
      {info.users.map(user => (
        <div key={user.id} className="purchases-table-box">
          <p className="primary-subtitle">{user.nickname}</p>
          <p className="primary-subtitle">{user.email}</p>
          <p className="primary-subtitle primary-subtitle--bold">{user.registered.length}</p>
        </div>
      ))}
    </div>
  </>
)