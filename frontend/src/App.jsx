import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Account from './pages/Account';
import Transaction from './pages/Transaction';
import Customer from './pages/Customer';
import AccountCreate from './pages/AccountCreate';
import AccountRead from './pages/AccountRead';
import AccountUpdate from './pages/AccountUpdate';
import CustomerRead from './pages/CustomerRead';
import CustomerCreate from './pages/CustomerCreate';
import CustomerUpdate from './pages/CustomerUpdate';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
          <Route path="/accountCreate" element={<AccountCreate />} />
          <Route path="/accountUpdate" element={<AccountUpdate />} />
          <Route path="/accountRead" element={<AccountRead />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/customer" element={<Customer />} />
          <Route path="/customerCreate" element={<CustomerCreate />} />
          <Route path="/customerUpdate" element={<CustomerUpdate />} />
          <Route path="/customerRead" element={<CustomerRead />} />
      </Routes>
    </Router>
  );
};

export default App;
