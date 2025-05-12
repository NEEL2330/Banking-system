import React from 'react';
import Card from "../components/Card"
import AccountCreate from "./AccountCreate"
const Account = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Welcome to the Banking System</h2>
      <div className="card-container">
        <Card title="Create Account" description="Not having Account" path="/accountCreate"/>
        <Card title="Update Account" description="Update the Account details" path="/accountUpdate"/>
        <Card title="Read Account" description="Information regarding Account details" path="/accountRead"/>
      </div>
    </div>
  );
};

export default Account;
