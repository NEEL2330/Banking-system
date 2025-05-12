import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/account">Account</Link>
      <Link to="/transaction">Transaction</Link>
      <Link to="/customer">Customer</Link>
    </nav>
  );
};

export default Navbar;
