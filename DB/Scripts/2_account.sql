CREATE TABLE IF NOT EXISTS accounttable(
    Account_id INT AUTO_INCREMENT PRIMARY KEY,
    Customer_id INT,
    Account_no INT UNIQUE,
    Account_balance INT,
    FOREIGN KEY (Customer_id) REFERENCES customertable(Customer_id) ON DELETE CASCADE
);

-- Insert dummy account data (requires existing customer)
-- Using Customer_id = 1 (the dummy customer inserted in 1_customer.sql)
INSERT INTO accounttable (Customer_id, Account_no, Account_balance) 
VALUES (1, 1001, 5000), (1, 1002, 3000);