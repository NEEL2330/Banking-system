CREATE TABLE IF NOT EXISTS customertable(
    Customer_id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    City_name varchar(50),
    Mobile_no bigint,
    Email VARCHAR(255),
    DOB INT
);

-- Insert dummy customer data
INSERT INTO customertable (Name, City_name, Mobile_no, Email, DOB) 
VALUES ('rahul sharma', 'pune', 1234567890, 'rahul.sharma@example.com', 19900101);