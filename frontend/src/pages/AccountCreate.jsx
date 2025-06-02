import React, { useState } from "react";
import axios from "axios";
import "../css/AccountCreate.css";

const AccountCreate = () => {
  const [Customer, setCustomer] = useState("");
  const [Account, setAccount] = useState("");
  const [Balance, setBalance] = useState("");
  const [responseMsg, setresponseMsg] = useState("");

  const handlesubmit = (e) => {
  e.preventDefault();
  const NewData = {
    'customer_id': Customer,
    'account_no': Account,
    'Balance': Balance
  };

  axios.post("http://13.234.241.238:5000//account", NewData)
    .then((response) => {
      setresponseMsg("✅ Data Submitted!");
    })
    .catch((error) => {
      console.error("Error submitting data:", error);
      setresponseMsg("❌ Failed to submit data. Please try again.");
    });
};

  return (
    <div className="form-container">
      <h2>Creating Account</h2>
      <form onSubmit={handlesubmit}>
        <h3>Customer ID</h3>
        <input 
          type="text"
          placeholder="Customer ID"
          value={Customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
        <h3>Account No</h3>
        <input 
          placeholder="Account No"
          value={Account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <h3>Balance</h3>
        <input 
          placeholder="Balance"
          value={Balance}
          onChange={(e) => setBalance(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {responseMsg && <div className="response-msg">{responseMsg}</div>}
    </div>
  );
};

export default AccountCreate;
