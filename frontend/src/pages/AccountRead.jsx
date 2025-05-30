import React, { useEffect, useState } from 'react';
import axios from "axios";

const AccountRead = () => {
  const [accountInput, setAccountInput] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    axios.get("http://43.204.162.5:5000/account")
      .then((response) => {
        setData(response.data);
        setLoading(false);
        console.log(response);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const findAccount = data.find(account => account["Account no"] === Number(accountInput));
    if (findAccount) {
      setBalance(findAccount);
    }
  };

  if (loading) return <div>Loading....</div>;

  return (
    <div className="page-container">
      <h2>Account Balance Lookup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Account Number"
          value={accountInput}
          onChange={(e) => setAccountInput(e.target.value)}
        />
        <button type='submit'>Search</button>
      </form>
      {balance !== null && (
        <div>
          <h3>Account Details:</h3>
          {typeof balance['Account balcance'] === "number" ? 
          <div>
            <p>Balance : ₹{balance['Account balcance']}</p>
            <p>Account ID : {balance['Account id']}</p>
            <p>Customer ID : {balance['Customer id']}</p>
          </div>
          : <p>Account not found</p>}
        </div>
      )}
    </div>
  );
};

export default AccountRead;
