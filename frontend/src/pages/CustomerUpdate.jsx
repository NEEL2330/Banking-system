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

const CustomerUpdate = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [responseMsg, setResponseMsg] = useState(""); // To show response message

  const options = ['City', 'Mobile', 'email'];

  useEffect(() => {
    switch (selectedOption) {
      case 'City':
        setInputValues({ name: "", City: "" });
        break;
      case 'Mobile':
        setInputValues({ name: "", Mobile: "" });
        break;
      case 'email':
        setInputValues({ name: "", email: "" });
        break;
      default:
        setInputValues({});
    }
    setResponseMsg('');
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

    try {
      console.log(inputValues)
      const response = await axios.put("http://127.0.0.1:5000/customer", inputValues);
      setResponseMsg("Data updated successfully!");
    } catch (error) {
      setResponseMsg("Update failed. Please check the server.");
      console.error(error);
    }
  };

  const renderInputFields = () => {
    switch (selectedOption) {
      case 'City':
        return (
          <>
            <InputBar name="name" placeholder="Enter Name" value={inputValues.name || ''} onChange={handleInputChange} />
            <InputBar name="City" placeholder="Enter City" value={inputValues.City || ''} onChange={handleInputChange} />
          </>
        );
      case 'Mobile':
        return (
          <>
            <InputBar name="name" placeholder="Enter Name" value={inputValues.name || ''} onChange={handleInputChange} />
            <InputBar name="Mobile" placeholder="Enter Mobile" value={inputValues.Mobile || ''} onChange={handleInputChange} />
          </>
        );
      case 'email':
        return (
          <>
            <InputBar name="name" placeholder="Enter Name" value={inputValues.name || ''} onChange={handleInputChange} />
            <InputBar name="email" placeholder="Enter Email" value={inputValues.email || ''} onChange={handleInputChange} />
          </>
        );
      default:
        return null;
    }
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
        {renderInputFields()}
        {selectedOption && <button type="submit" style={{ marginTop: '10px' }}>Submit</button>}
      </form>

      {responseMsg && <p style={{ color: 'green', marginTop: '10px' }}>{responseMsg}</p>}

    </div>
  );
};

export default CustomerUpdate;
