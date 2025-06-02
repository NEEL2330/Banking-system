import React, { useState, useEffect } from 'react';
import '../css/CustomerRead.css';


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

const transactionRead = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const options = ['Transaction ID', 'Account No'];

  useEffect(() => {
    fetch('http://13.234.241.238:5000/transaction')
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(err => console.error('Error fetching customers:', err));
  }, []);

  useEffect(() => {
    switch (selectedOption) {
      case 'Transaction ID':
        setInputValues({Transaction : '' });
        break;
      case 'Account No':
        setInputValues({Account : '' });
        break;
      default:
        setInputValues({});
    }
    setFilteredCustomers([]);
  }, [selectedOption]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let filtered = [];

    if (selectedOption === 'Transaction ID' && inputValues.Transaction) {
      filtered = customers.filter(customer =>
        customer['Transaction id'].toString().includes(inputValues.Transaction)
      );
    } else if (selectedOption === 'Account No' && inputValues.Account) {
      filtered = customers.filter(customer =>
        customer['From account no'].toString().includes(inputValues.Account)
      );
    } 
    setFilteredCustomers(filtered);
  };

  const renderInputFields = () => {
    switch (selectedOption) {
      case 'Transaction ID':
        return (
          <InputBar name="Transaction" placeholder="Enter Transaction ID" value={inputValues.Transaction || ''} onChange={handleInputChange} />
        );
      case 'Account No':
        return (
          <InputBar name="Account" placeholder="Enter Account No" value={inputValues.Account || ''} onChange={handleInputChange} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="customer-container">
      <h2>Select Search Option</h2>
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
        {renderInputFields()}
        {selectedOption && <button type="submit" style={{ marginTop: '10px' }}>Submit</button>}
      </form>

      {selectedOption && <div className="customer-results">
        <h3>Search Results:</h3>
        {filteredCustomers.length === 0 && <div>No matching customers found.</div>}
        {filteredCustomers.map((customer, index) => (
          <div key={index} className="customer-card">
            <strong>From Account No:</strong> {customer["From account no"]}<br />
            <strong>To Account No:</strong> {customer["To account no"]}<br />
            <strong>Amount:</strong> {customer["Transaction amount"]}<br />
            <strong>Transaction id:</strong> {customer["Transaction id"]}<br />
          </div>
        ))}
      </div>}
    </div>
  );
};

export default transactionRead;
