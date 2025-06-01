import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const Home = () => {

  return (
    <div className="home-container">
      <h2 className="home-title">Welcome to the Banking System</h2>
      <div className="card-container">
        <Card title="Account" description="Manage bank accounts" path="/account"/>
        <Card title="Transaction" description="View and add transactions" path="/transaction"/>
        <Card title="Customer details" description="Customer details and actions" path="/customer"/>
      </div>
    </div>
  );
};

export default Home; 