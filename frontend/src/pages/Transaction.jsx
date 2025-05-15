import React from "react";
import Card from "../components/Card";

const Customer = () =>{
  return (
    <>
      <div className="page-container">
        <h2 className="page-title">Transaction Detail</h2>
        <div className="card-container">
          <Card title = "Read Transaction" description="All transation will be shown here" path ="/transactionRead"/>
          <Card title = "Send Money" description="Money transfer between accounts" path ="/transactionPut"/>
        </div>
      </div>
    </>
  );
};
export default Customer;