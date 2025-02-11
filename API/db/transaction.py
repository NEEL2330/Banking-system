import mysql.connector

database=mysql.connector.connect(
    host="localhost",
    user="root",
    password="Neelbera@2330",
    database="banking_system"
)   

def trasnsaction(from_account_no, to_account_no, amount):
    cursorobject=database.cursor()
    sql="INSERT INTO transactiontable (From_account_no, To_account_no, Transaction_amount) VALUES(%s, %s, %s)"
    cursorobject.execute(sql,(from_account_no, to_account_no, amount))
    add_balance(to_account_no,amount)
    subtract_balance(from_account_no,amount)
    database.commit()
    return "Transaction has placed successfully"

def read():
    cursorobject=database.cursor()
    cursorobject.execute("SELECT * FROM transactiontable")
    database.commit()
    return "Table are : "

def read_by_transaction_id(transaction_id):
    cursorobject=database.cursor()
    sql="SELECT * FROM transactiontable WHERE Transaction_id = %s"
    cursorobject.execute(sql,(transaction_id,))
    database.commit()
    return "Transaction table : "

def read_by_account_no(account_no):
    cursorobject=database.cursor()
    sql="SELECT * FROM transactiontable WHERE From_account_no = %s"
    cursorobject.execute(sql,(account_no,))
    database.commit()
    return "Transaction table : "

def add_balance(account_no,amount):
    cursorobject=database.cursor()
    sql="UPDATE FROM accounttable SET Account_balance = Account_balance + %s WHERE Account_no = %s"
    cursorobject.execute(sql,(amount,account_no))
    database.commit()
    return "Account balance Updated"

def subtract_balance(account_no,amount):
    cursorobject=database.cursor()
    sql="UPDATE accounttable SET Account_balance = Account_balance - %s WHERE Account_no = %s"
    cursorobject.execute(sql,(amount,account_no))
    database.commit()
    return "Account balance updated"