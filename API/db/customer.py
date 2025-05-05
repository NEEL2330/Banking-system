import mysql.connector

database = mysql.connector.connect(
    host="db-container-part-1",   
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

def read_by_name(name):
    cursorobject=database.cursor()
    sql="SELECT * FROM customertable WHERE Name = %s"
    cursorobject.execute(sql,(name,))
    result=cursorobject.fetchall()
    customer=[]
    for Customer_ID,name,city,mobile,email,DOB in result:
        customer.append({"DOB":DOB,"Email":email,"Mobile":mobile,"City":city,"Name":name,"customer id":Customer_ID})
    return customer

def read_by_city(city):
    cursorobject=database.cursor()
    sql="SELECT * FROM customertable WHERE City_name = %s"
    cursorobject.execute(sql,(city,))
    result=cursorobject.fetchall()
    customer=[]
    for Customer_ID,name,city,mobile,email,DOB in result:
        customer.append({"DOB":DOB,"Email":email,"Mobile":mobile,"City":city,"Name":name,"customer id":Customer_ID})
    return customer

def read_by_name_age(age,name):
    cursorobject=database.cursor()
    sql="SELECT * FROM customertable WHERE Name = %s AND DOB = %s"
    cursorobject.execute(sql,(name,age))
    result=cursorobject.fetchall()
    customer=[]
    for Customer_ID,name,city,mobile,email,DOB in result:
        customer.append({"DOB":DOB,"Email":email,"Mobile":mobile,"City":city,"Name":name,"customer id":Customer_ID})
    return customer

def delete(name):
    cursorObject=database.cursor()
    sql="DELETE FROM customertable WHERE Name = %s"
    cursorObject.execute(sql,(name,)) #We cant simply write cursorObject.execute(sql,(customer_id)) because it will take customer_id as a tuple. Instead we have to write cursorObject.execute(sql,(customer_id,)) which take elemtns as tuple
    database.commit()
    return cursorObject.rowcount

def update_by_name_city(name, city):
    cursorobject=database.cursor()
    sql="UPDATE customertable SET City_name = %s WHERE Name = %s"
    cursorobject.execute(sql,(city,name))
    database.commit()
    return {"Message": "Customer successfully updated"}

def update_by_name_email(name, email):
    cursorobject=database.cursor()
    sql="UPDATE customertable SET Email = %s WHERE Name = %s"
    cursorobject.execute(sql,(email,name))
    database.commit()
    return {"Message": "Customer successfully updated"}

def update_by_name_mobile(name, mobile):
    cursorobject=database.cursor()
    sql="UPDATE customertable SET Mobile_no = %s WHERE Name = %s"
    cursorobject.execute(sql,(mobile,name))
    database.commit()
    return {"Message": "Customer successfully updated"}
