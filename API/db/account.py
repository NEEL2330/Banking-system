import mysql.connector

database=mysql.connector.connect(
    host="localhost",
    user="root",
    password="Neelbera@2330",
    database="banking_system"
)

def create_account(Customer_id,Account_no,Account_balance):
    cursorobject=database.cursor()
    sql="INSERT INTO accounttable (Customer_id,Account_no,Account_balance) VALUES (%s,%s,%s)"
    cursorobject.execute(sql,(Customer_id,Account_no,Account_balance))
    database.commit()
    return cursorobject.rowcount,"record inserted."