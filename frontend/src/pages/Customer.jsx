import React from "react";
import Card from "../components/Card";

const Customer = () =>{
  return (
    <>
      <div className="page-container">
        <h2 className="page-title">Customer Detail</h2>
        <div className="card-container">
          <Card title = "Create Account" description="Add customer details" path ="/customerCreate"/>
          <Card title = "Update Account" description="Update customer details" path ="/customerUpdate"/>
          <Card title = "Read Account" description="Read customer details" path ="/customerRead"/>
        </div>
      </div>
    </>
  );
};
export default Customer;