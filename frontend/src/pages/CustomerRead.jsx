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

const CustomerRead = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const options = ['Name', 'City', 'DOB and Name'];

  useEffect(() => {
    fetch('http://localhost:5000/customer')
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(err => console.error('Error fetching customers:', err));
  }, []);

  useEffect(() => {
    switch (selectedOption) {
      case 'Name':
        setInputValues({ name: '' });
        break;
      case 'City':
        setInputValues({ city: '' });
        break;
      case 'DOB and Name':
        setInputValues({ dob: '', name: '' });
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

    if (selectedOption === 'Name' && inputValues.name) {
      filtered = customers.filter(customer =>
        customer.Name.toLowerCase().includes(inputValues.name.toLowerCase())
      );
    } else if (selectedOption === 'City' && inputValues.city) {
      filtered = customers.filter(customer =>
        customer.City.toLowerCase().includes(inputValues.city.toLowerCase())
      );
    } else if (
      selectedOption === 'DOB and Name' &&
      inputValues.dob &&
      inputValues.name
    ) {
      filtered = customers.filter(customer =>
        customer.DOB.toString() === inputValues.dob &&
        customer.Name.toLowerCase().includes(inputValues.name.toLowerCase())
      );
    }

    setFilteredCustomers(filtered);
  };

  const renderInputFields = () => {
    switch (selectedOption) {
      case 'Name':
        return (
          <InputBar name="name" placeholder="Enter Name" value={inputValues.name || ''} onChange={handleInputChange} />
        );
      case 'City':
        return (
          <InputBar name="city" placeholder="Enter City" value={inputValues.city || ''} onChange={handleInputChange} />
        );
      case 'DOB and Name':
        return (
          <>
            <InputBar name="dob" placeholder="Enter DOB" value={inputValues.dob || ''} onChange={handleInputChange} />
            <InputBar name="name" placeholder="Enter Name" value={inputValues.name || ''} onChange={handleInputChange} />
          </>
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
            <strong>Name:</strong> {customer.Name}<br />
            <strong>City:</strong> {customer.City}<br />
            <strong>DOB:</strong> {customer.DOB}<br />
            <strong>Email:</strong> {customer.Email}<br />
            <strong>Mobile:</strong> {customer.Mobile}<br />
            <strong>Customer ID:</strong> {customer["customer id"]}
          </div>
        ))}
      </div>}
    </div>
  );
};

export default CustomerRead;
