CREATE TABLE IF NOT EXISTS transactiontable(
    Transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    From_account_no INT,
    To_account_no INT,
    Transaction_amount INT,
    FOREIGN KEY (From_account_no) REFERENCES accounttable(Account_no) ON DELETE CASCADE,
    FOREIGN KEY (To_account_no) REFERENCES accounttable(Account_no) ON DELETE CASCADE
);

-- Insert dummy transaction data (requires existing accounts)
-- Transferring 500 from account 1001 to account 1002
INSERT INTO transactiontable (From_account_no, To_account_no, Transaction_amount) 
VALUES (1001, 1002, 500);