CREATE TABLE IF NOT EXISTS transactiontable(
    Transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    From_account_no INT,
    To_account_no INT,
    Transaction_amount INT,
    FOREIGN KEY (From_account_no) REFERENCES accounttable(Account_no) ON DELETE CASCADE,
    FOREIGN KEY (To_account_no) REFERENCES accounttable(Account_no) ON DELETE CASCADE
);