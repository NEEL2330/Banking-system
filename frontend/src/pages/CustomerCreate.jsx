import React, { useState } from "react";
import axios from "axios";
import "../css/AccountCreate.css";

const CustomerCreate = () => {
  const [Name, setName] = useState("");
  const [City, setCity] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Email, setEmail] = useState("");
  const [Age, setAge] = useState("");
  const [responseMsg, setresponseMsg] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    const NewData = { 'Name' : Name, 'City' : City, 'Mobile' : Mobile, 'Email' : Email, 'dob' : Age};
    axios.post("https://5tvya3suhd.execute-api.ap-south-1.amazonaws.com/prod/customer", NewData)
      .then((response) => {
        setresponseMsg("Data Submitted!!");
    })
    setresponseMsg("Data Submitted!!");
  };

  return (
    <div className="form-container">
      <h2>Creating Customer account</h2>
      <form onSubmit={handlesubmit}>
        <h3>Name</h3>
        <input 
          type="text"
          placeholder="Name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
        <h3>City</h3>
        <input 
          placeholder="City"
          value={City}
          onChange={(e) => setCity(e.target.value)}
        />
        <h3>Mobile No.</h3>
        <input 
          type="text"
          placeholder="Mobile No"
          value={Mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <h3>Email</h3>
        <input 
          type="text"
          placeholder="Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h3>Age</h3>
        <input 
          type="text"
          placeholder="Age"
          value={Age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {responseMsg && <div className="response-msg">{responseMsg}</div>}
    </div>
  );
};

export default CustomerCreate;
