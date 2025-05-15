import React, { useState, useEffect } from 'react';
import '../css/CustomerRead.css';
import axios from 'axios';

const InputBar = ({ name, placeholder, value, onChange }) => (
  <div>
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

const AccountUpdate = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [responseMsg, setResponseMsg] = useState("");

  const options = ['Deposit', 'Withdraw']; // 🔧 Fix: spelling "Depost" -> "Deposit"

  useEffect(() => {
    if (selectedOption) {
      setInputValues({ account_id: "", Balance: "" });
    } else {
      setInputValues({});
    }
  }, [selectedOption]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let dataToSend = { ...inputValues };

    let balanceValue = parseInt(dataToSend.Balance);

    if (isNaN(balanceValue)) {
      setResponseMsg("Please enter a valid number for Balance.");
      return;
    }

    if (selectedOption === 'Deposit') {
      dataToSend.Balance = `+${balanceValue}`;
    } else if (selectedOption === 'Withdraw') {
      dataToSend.Balance = `-${balanceValue}`;
    }

    try {
      console.log(dataToSend);
      const response = await axios.put("http://localhost:5000/account", dataToSend);
      setResponseMsg("Data updated successfully!");
    } catch (error) {
      setResponseMsg("Update failed. Please check the server.");
      console.error(error);
    }
  };

  const renderInputFields = () => {
    return (
      <>
        <InputBar
          name="account_id"
          placeholder="Enter Account ID"
          value={inputValues.account_id || ''}
          onChange={handleInputChange}
        />
        <InputBar
          name="Balance"
          placeholder="Enter Amount"
          value={inputValues.Balance || ''}
          onChange={handleInputChange}
        />
      </>
    );
  };

  return (
    <div className="customer-container">
      <h2>Select Option to Update</h2>

      <div>
        {options.map((option, index) => (
          <label key={index} className="customerlist">
            <input
              type="radio"
              name="customradio"
              value={option}
              checked={selectedOption === option}
              onChange={() => setSelectedOption(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>

      <form style={{ marginTop: '20px' }} onSubmit={handleSubmit}>
        {selectedOption && renderInputFields()}
        {selectedOption && (
          <button type="submit" style={{ marginTop: '10px' }}>
            Submit
          </button>
        )}
      </form>

      {responseMsg && (
        <p style={{ color: 'green', marginTop: '10px' }}>{responseMsg}</p>
      )}
    </div>
  );
};

export default AccountUpdate;
