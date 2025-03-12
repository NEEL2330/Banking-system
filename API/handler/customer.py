from flask import Flask, request
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from db.customer import create_customer, read, delete, read_by_name, update_by_name_city, update_by_name_email, update_by_name_mobile,read_by_city,read_by_name_age
        

app = Flask(__name__)
@app.route('/customer', methods = ['POST'])
def create_route():
    body=request.json
    name=body["Name"]
    city=body["City"]
    mobile=body["Mobile"]
    email=body["Email"]
    dob=body["dob"]
    create_customer(name=name,city=city,mobile=mobile,email=email,dob=dob)
    return "Customer details addedd successfully"

@app.route('/customer1', methods = ['GET'])
def read_customer():
    name=request.args.get("name",None)
    city=request.args.get(" City",None)
    dob=request.args.get("dob",None)
    if name and dob:
        data=read_by_name_age(int(dob),name)
        return data
    elif name:
        data=read_by_name(name)
        return data
    elif city:
        data=read_by_city(city)
        return data
    else:
        data=read()
        return data


@app.route('/customer2',methods = ['GET','PUT'])
def update_customer():
    name=request.args.get("name",None)
    city=request.args.get("City",None)
    email=request.args.get("email",None)
    mobile=request.args.get("Mobile",None)
    if name and city:
        update_by_name_city(name=name,city=city)
        return "Data is updated"
    elif name and email:
        update_by_name_email(name,email)
        # Flask will not expect set as a return type
        return {"Message":"Data is updated"}  
    elif name and mobile:
        update_by_name_mobile(name,mobile)
        return "Data is updated"

@app.route('/customer3',methods=['DELETE'])
def delete_customer():
    name=request.args.get("Name",None)  
    count=delete(name=name)
    return "{} rows were affected".format(count) 

if __name__ == '__main__':
    app.run(debug=True)