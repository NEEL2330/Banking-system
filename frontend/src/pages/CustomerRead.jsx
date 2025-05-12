import React, { useState } from 'react';
import '../css/AccountRead.css'; // 👈 CSS file renamed accordingly

const CustomerRead = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const options = ['Account No', 'Option 2', 'Option 3', 'Option 4'];

  return (
    <div className="account-container">
      <h1 className="account-title">Select an Option</h1>
      
      <div className="account-list">
        {options.map((option, index) => (
          <label key={index} className="account-item">
            <input
              type="radio"
              name="customRadio"
              value={option}
              checked={selectedOption === option}
              onChange={() => setSelectedOption(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CustomerRead;
