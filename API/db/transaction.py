import mysql.connector

database = mysql.connector.connect(
    host="db_container",   
    user="root",
    password="Neelbera@2330",
    database="banking_system",
    autocommit=True
)


def trasnsaction(from_account_no, to_account_no, amount):
    cursorobject=database.cursor()
    sql1 = "UPDATE accounttable SET Account_balance = Account_balance - %s WHERE Account_no = %s"
    cursorobject.execute(sql1, (amount, from_account_no))

    # Add to receiver
    sql2 = "UPDATE accounttable SET Account_balance = Account_balance + %s WHERE Account_no = %s"
    cursorobject.execute(sql2, (amount, to_account_no))

    # Log transaction
    sql3 = "INSERT INTO transactiontable (From_account_no, To_account_no, Transaction_amount) VALUES(%s, %s, %s)"
    cursorobject.execute(sql3, (from_account_no, to_account_no, amount))

    # Final commit only once
    database.commit()
    cursorobject.close()
    return "Transaction has been placed successfully"

def read():
    cursorobject=database.cursor()
    cursorobject.execute("SELECT * FROM transactiontable")
    result=cursorobject.fetchall()
    transaction=[]
    for Transaction_id, From_account_no, To_account_no, Transaction_amount in result:
        transaction.append({"Transaction id":Transaction_id, "From account no":From_account_no, "To account no":To_account_no, "Transaction amount":Transaction_amount})
    cursorobject.close()
    return transaction

def read_by_transaction_id(transaction_id):
    cursorobject=database.cursor()
    sql="SELECT * FROM transactiontable WHERE Transaction_id = %s"
    cursorobject.execute(sql,(transaction_id,))
    result=cursorobject.fetchall()
    transaction=[]
    for Transaction_id, From_account_no, To_account_no, Transaction_amount in result:
        transaction.append({"Transaction id":Transaction_id, "From account no":From_account_no, "To account no":To_account_no, "Transaction amount":Transaction_amount})
    cursorobject.close()
    return transaction

def read_by_account_no(account_no):
    cursorobject=database.cursor()
    sql="SELECT * FROM transactiontable WHERE From_account_no = %s OR To_account_no = %s"
    cursorobject.execute(sql,(account_no,account_no))
    result=cursorobject.fetchall()
    transaction=[]
    for Transaction_id, From_account_no, To_account_no, Transaction_amount in result:
        transaction.append({"Transaction id":Transaction_id, "From account no":From_account_no, "To account no":To_account_no, "Transaction amount":Transaction_amount})
    cursorobject.close()
    return transaction

def add_balance(account_no,amount):
    cursorobject=database.cursor()
    sql="UPDATE accounttable SET Account_balance = Account_balance + %s WHERE Account_no = %s"
    cursorobject.execute(sql,(amount,account_no))
    database.commit()
    cursorobject.close()
    return "Transaction successfully done"

def subtract_balance(account_no,amount):
    cursorobject=database.cursor()
    sql="UPDATE accounttable SET Account_balance = Account_balance - %s WHERE Account_no = %s"
    cursorobject.execute(sql,(amount,account_no))
    database.commit()
    cursorobject.close()
    return "Transaction successfully done"