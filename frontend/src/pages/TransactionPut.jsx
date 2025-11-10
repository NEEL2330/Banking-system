import React, { useState } from "react";
import axios from "axios";
import "../css/AccountCreate.css";

const TransactionPut = () => {
  const [Faccount, setFaccount] = useState("");
  const [Taccount, setTaccount] = useState("");
  const [Amount, setAmount] = useState("");
  const [responseMsg, setresponseMsg] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    const NewData = {'from_account_no' : Faccount, 'to_account_no' : Taccount, 'amount' : Amount};
    axios.put("https://5tvya3suhd.execute-api.ap-south-1.amazonaws.com/prod/transaction", NewData)
      .then((response) => {
        setresponseMsg("Data Submitted!!");
    })
    // setresponseMsg("Data Submitted!!");
  };

  return (
    <div className="form-container">
      <h2>Online Transaction</h2>
      <form onSubmit={handlesubmit}>
        <h3>Sender's Account No</h3>
        <input 
          type="text"
          placeholder="Account No"
          value={Faccount}
          onChange={(e) => setFaccount(e.target.value)}
        />
        <h3>Reciever's Account No</h3>
        <input 
          placeholder="Account No"
          value={Taccount}
          onChange={(e) => setTaccount(e.target.value)}
        />
        <h3>Amount</h3>
        <input 
          type="text"
          placeholder="Amount"
          value={Amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {responseMsg && <div className="response-msg">{responseMsg}</div>}
    </div>
  );
};

export default TransactionPut;
