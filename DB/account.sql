CREATE TABLE AccountTable(
        Account_id INT AUTO_INCREMENT PRIMARY KEY,
        Customer_id INT,
        Account_no INT UNIQUE,
        Account_balance INT,
        FOREIGN KEY (Customer_id) REFERENCES CustomerTable(Customer_id) ON DELETE CASCADE
    )