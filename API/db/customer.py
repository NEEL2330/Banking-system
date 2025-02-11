import mysql.connector

database=mysql.connector.connect(
    host="localhost",
    user="root",
    password="Neelbera@2330",
    database="banking_system"
)

def create_customer(name, city, mobile, email, dob): 
    cursorObject = database.cursor()
    sql = "INSERT INTO customertable (NAME, City_name, Mobile_no, Email, DOB) VALUES (%s, %s, %s, %s, %s)"
    cursorObject.execute(sql,(name,city,mobile, email, dob))

    database.commit()

    return cursorObject.rowcount, "record inserted."

def read():
    cursorobject=database.cursor()
    cursorobject.execute("SELECT * FROM customertable")
    result=cursorobject.fetchall()
    customer=[]
    for Customer_ID,name,city,mobile,email,DOB in result:
        customer.append({"DOB":DOB,"Email":email,"Mobile":mobile,"City":city,"Name":name,"customer id":Customer_ID})
    return customer

def delete(customer_id):
    cursorObject=database.cursor()
    sql="DELETE FROM customertable WHERE Customer_ID = %s"
    cursorObject.execute(sql,(customer_id,)) #We cant simply write cursorObject.execute(sql,(customer_id)) because it will take customer_id as a tuple. Instead we have to write cursorObject.execute(sql,(customer_id,)) which take elemtns as tuple
    database.commit()
    return {"Message": "Customer successfully deleted"}

def read_by_name(name):
    cursorobject=database.cursor()
    sql="SELECT * FROM customertable WHERE Name = %s"
    cursorobject.execute(sql,(name,))
    result=cursorobject.fetchall()
    customer=[]
    for Customer_ID,name,city,mobile,email,DOB in result:
        customer.append({"DOB":DOB,"Email":email,"Mobile":mobile,"City":city,"Name":name,"customer id":Customer_ID})
    return customer

def update_by_id_city(customer_id, city):
    cursorobject=database.cursor()
    sql="UPDATE customertable SET City_name = %s WHERE Customer_id = %s"
    cursorobject.execute(sql,(city,customer_id))
    database.commit()
    return {"Message": "Customer successfully updated"}

def update_by_id_email(customer_id, email):
    cursorobject=database.cursor()
    sql="UPDATE customertable SET Email = %s WHERE Customer_id = %s"
    cursorobject.execute(sql,(email,customer_id))
    database.commit()
    return {"Message": "Customer successfully updated"}

def update_by_id_mobile(customer_id, mobile):
    cursorobject=database.cursor()
    sql="UPDATE customertable SET Mobile_no = %s WHERE Customer_id = %s"
    cursorobject.execute(sql,(mobile,customer_id))
    database.commit()
    return {"Message": "Customer successfully updated"}
