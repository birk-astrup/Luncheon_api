import React, {useState} from 'react';

import './MonthPicker.scss';

const monthNames = [
  'Januar',
  'Februar',
  'Mars',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Desember',
];


export default () => {
  const date = new Date();
  const [isOpen, setIsOpen] = useState(false)
  const [month, setMonth] = useState(monthNames[date.getMonth()])

  const toggleItem = (index) => {
    let monthChosen = monthNames[index]
    if (month !== monthChosen) setMonth(monthChosen);
    setIsOpen(false);
  }

  return (
    <div className="monthpicker-box">
      <h1 className="big-title" onClick={() => setIsOpen(!isOpen)}>{month}</h1>
      {/* Dropdown list */}
      {isOpen && <ul className="monthpicker-list">
        {monthNames.map((item, index) => (
          <li key={index} onClick={() => toggleItem(index)}>{item}</li>
        ))}
      </ul>
    }

      <p className="primary-subtitle">Sorter på måned</p>
    </div>
  )
}
