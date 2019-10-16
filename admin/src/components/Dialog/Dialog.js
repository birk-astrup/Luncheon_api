import React from 'react';
import {useMutation} from '@apollo/react-hooks'
import DELETE_TIMESTAMP from '../../mutations/deleteTimestamp';

import './Dialog.scss';



export default ({user, setIsOpen}) => {
  const [deleteTimestamp] = useMutation(DELETE_TIMESTAMP, {
    refetchQueries: ['getUsers']
  });

  return (
    <div>
      <div className="dialog">
        <h1 className="big-title big-title--black">{user.nickname}</h1>
        <h3 className="primary-subtitle">{user.email}</h3>

        <div className="dialog-registered">
        {console.log(user)}
          {user.registered.map(i => (
            <div key={i._id} className="dialog-purchase">
              <p className="primary-text">{i.timestamp}</p>
              <p className="primary-text dialog-purchase-delete" 
                onClick={() => deleteTimestamp({variables: {
                  user_id:user.id,
                  timestamp_id: i._id
                }})}>delete</p>
            </div>
          ))}

        </div>
      </div>
      <div className="shader" onClick={() => setIsOpen(false)}></div>
    </div>
  )
}