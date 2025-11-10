-- Banking System Database Setup Script
-- Run this script in MySQL to set up the database

-- Create database
CREATE DATABASE IF NOT EXISTS banking_system;
USE banking_system;

-- Create customer table
CREATE TABLE IF NOT EXISTS customertable(
    Customer_id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    City_name varchar(50),
    Mobile_no bigint,
    Email VARCHAR(255),
    DOB INT
);

-- Create account table
CREATE TABLE IF NOT EXISTS accounttable(
    Account_id INT AUTO_INCREMENT PRIMARY KEY,
    Customer_id INT,
    Account_no INT UNIQUE,
    Account_balance INT,
    FOREIGN KEY (Customer_id) REFERENCES customertable(Customer_id) ON DELETE CASCADE
);

-- Create transaction table
CREATE TABLE IF NOT EXISTS transactiontable(
    Transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    From_account_no INT,
    To_account_no INT,
    Transaction_amount INT,
    FOREIGN KEY (From_account_no) REFERENCES accounttable(Account_no) ON DELETE CASCADE,
    FOREIGN KEY (To_account_no) REFERENCES accounttable(Account_no) ON DELETE CASCADE
);

-- Insert sample data (optional)
INSERT INTO customertable (Name, City_name, Mobile_no, Email, DOB) VALUES
('John Doe', 'New York', 1234567890, 'john@example.com', 19900101),
('Jane Smith', 'Los Angeles', 9876543210, 'jane@example.com', 19850515);

INSERT INTO accounttable (Customer_id, Account_no, Account_balance) VALUES
(1, 1001, 5000),
(2, 1002, 7500);

-- Show tables to verify setup
SHOW TABLES;
