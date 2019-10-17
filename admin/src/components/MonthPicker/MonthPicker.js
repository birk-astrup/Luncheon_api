import React, {useState, useEffect} from 'react';

import {MONTH_NAMES, SORT_PER_MONTH} from '../../constants/constants'
import './MonthPicker.scss';

export default ({monthPicked}) => {
  const date = new Date();
  const [isOpen, setIsOpen] = useState(false)
  const [month, setMonth] = useState(MONTH_NAMES[date.getMonth()])

  const toggleItem = (index) => {
    let monthChosen = MONTH_NAMES[index]
    if (month !== monthChosen) {
      setMonth(monthChosen);
    }
    setIsOpen(false);
  }

  useEffect(() => {
    // Send it up
    monthPicked(month)
  }, [month, monthPicked])

  return (
    <div className="monthpicker-box">
      <h1 className="big-title" onClick={() => setIsOpen(!isOpen)}>{month}</h1>
      {/* Dropdown list */}
      {isOpen && <ul className="monthpicker-list">
        {MONTH_NAMES.map((item, index) => (
          <li key={index} onClick={() => toggleItem(index)}>{item}</li>
        ))}
      </ul>
    }

      <p className="primary-subtitle">{SORT_PER_MONTH}</p>
    </div>
  )
}
