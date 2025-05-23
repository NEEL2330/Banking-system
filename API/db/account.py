import mysql.connector

database = mysql.connector.connect(
    host="db_container",   
    user="root",
    password="Neelbera@2330",
    database="banking_system",
    autocommit=True
)

def create_account(Customer_id,Account_no,Account_balance):
    cursorobject=database.cursor()
    sql="INSERT INTO accounttable (Customer_id,Account_no,Account_balance) VALUES (%s,%s,%s)"
    cursorobject.execute(sql,(Customer_id,Account_no,Account_balance))
    database.commit()
    cursorobject.close()
    return cursorobject.rowcount,"record inserted."

def read():
    cursorobject=database.cursor()
    cursorobject.execute("SELECT * FROM accounttable")
    result=cursorobject.fetchall()
    customer=[]
    for Account_id,Customer_id,Account_no,Account_balance in result:
        customer.append({"Account id":Account_id,"Customer id":Customer_id,"Account no":Account_no,"Account balcance":Account_balance})
    cursorobject.close()
    return customer

def read_account_balance_by_account_no(account_no):
    cursorobject=database.cursor()
    sql="SELECT Account_balance FROM accounttable WHERE Account_no = %s"
    cursorobject.execute(sql,(account_no,))
    result=cursorobject.fetchall()
    account=[]
    for Account_balance in result:
        account.append({"Account balance":Account_balance})
    cursorobject.close()
    return account

def delete_account(account_id):
    cursorobject=database.cursor()
    sql="DELETE FROM accounttable WHERE Account_id = %s"
    cursorobject.execute(sql,(account_id,)) # Remeber without comma, python does not expect tupple.
    database.commit()                       # (sql,(account_id,))  Tupple
    cursorobject.close()
    return cursorobject.rowcount            # (sql,(account_id))   Not a tupple

def update_balance_by_accountid(account_id,balance):
    cursorobject=database.cursor()
    cursor = database.cursor()
    
    sql = "UPDATE accounttable SET Account_balance = Account_balance + %s WHERE Account_id = %s"
    cursor.execute(sql, (balance, account_id))
    
    database.commit()
    cursor.close()
    return cursorobject.rowcount
