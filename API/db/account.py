import mysql.connector
import os

database=mysql.connector.connect(
    host=os.getenv("DB_HOST", "localhost"),
    user=os.getenv("DB_USER", "root"),
    password=os.getenv("DB_PASSWORD", "Neelbera@2330t"),
    database=os.getenv("DB_NAME", "banking_system")
)

def create_account(Customer_id,Account_no,Account_balance):
    cursorobject=database.cursor()
    sql="INSERT INTO accounttable (Customer_id,Account_no,Account_balance) VALUES (%s,%s,%s)"
    cursorobject.execute(sql,(Customer_id,Account_no,Account_balance))
    database.commit()
    return cursorobject.rowcount,"record inserted."

def read():
    cursorobject=database.cursor()
    cursorobject.execute("SELECT * FROM accounttable")
    result=cursorobject.fetchall()
    customer=[]
    for Account_id,Customer_id,Account_no,Account_balance in result:
        customer.append({"Account id":Account_id,"Customer id":Customer_id,"Account no":Account_no,"Account balcance":Account_balance})
    return customer

def read_account_balance_by_account_no(account_no):
    cursorobject=database.cursor()
    sql="SELECT Account_balance FROM accounttable WHERE Account_no = %s"
    cursorobject.execute(sql,(account_no,))
    result=cursorobject.fetchall()
    account=[]
    for Account_balance in result:
        account.append({"Account balance":Account_balance})
    return account

def delete_account(account_id):
    cursorobject=database.cursor()
    sql="DELETE FROM accounttable WHERE Account_id = %s"
    cursorobject.execute(sql,(account_id,)) # Remeber without comma, python does not expect tupple.
    database.commit()                       # (sql,(account_id,))  Tupple
    return cursorobject.rowcount            # (sql,(account_id))   Not a tupple

def update_balance_by_accountid(account_id,balance):
    cursorobject=database.cursor()
    sql="UPDATE accounttable SET Account_balance = %s WHERE Account_id = %s"
    cursorobject.execute(sql,(balance,account_id))
    database.commit()
    return cursorobject.rowcount, "record updated"
