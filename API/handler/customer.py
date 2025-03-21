# from flask import Flask, request
# import sys
# import os
# sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
# from db.customer import create_customer, read, delete, read_by_name, update_by_name_city, update_by_name_email, update_by_name_mobile,read_by_city,read_by_name_age
        
# app = Flask(__name__)
# @app.route('/customer', methods = ['POST','PUT','DELETE','GET'])

# def customer_route():
#     if request.method == 'POST':
#         body=request.json
#         name=body["Name"]
#         city=body["City"]
#         mobile=body["Mobile"]
#         email=body["Email"]
#         dob=body["dob"]
#         create_customer(name=name,city=city,mobile=mobile,email=email,dob=dob)
#         return "Customer details addedd successfully"
    
#     elif request.method == 'GET':
#         name=request.args.get("name",None)
#         city=request.args.get("City",None)
#         dob=request.args.get("dob",None)
#         if name and dob:
#             data=read_by_name_age(int(dob),name)
#             return data
#         elif name:
#             data=read_by_name(name)
#             return data
#         elif city:
#             data=read_by_city(city)
#             return data
#         else:
#             data=read()
#             return data
        
#     elif request.method == 'PUT':
#         name=request.args.get("name",None)
#         city=request.args.get("City",None)
#         email=request.args.get("email",None)
#         mobile=request.args.get("Mobile",None)
#         if name and city:
#             update_by_name_city(name=name,city=city)
#             return "Data is updated"
#         elif name and email:
#             update_by_name_email(name,email)
#             # Flask will not expect set as a return type
#             return {"Message":"Data is updated"}  
#         elif name and mobile:
#             update_by_name_mobile(name,mobile)
#             return "Data is updated"
   
#     else:
#         name=request.args.get("Name",None)  
#         count=delete(name=name)
#         return "{} rows were affected".format(count) 

# if __name__ == '__main__':
#     app.run(host="0.0.0.0", port=5001)


from flask import Blueprint, request
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from db.customer import create_customer, read, delete, read_by_name, update_by_name_city, update_by_name_email, update_by_name_mobile, read_by_city, read_by_name_age

customer_bp = Blueprint("customer", __name__)

@customer_bp.route('/customer', methods=['POST', 'PUT', 'DELETE', 'GET'])
def customer_route():
    if request.method == 'POST':
        body = request.json
        create_customer(name=body["Name"], city=body["City"], mobile=body["Mobile"], email=body["Email"], dob=body["dob"])
        return "Customer details added successfully"

    elif request.method == 'GET':
        name = request.args.get("name", None)
        city = request.args.get("City", None)
        dob = request.args.get("dob", None)
        if name and dob:
            return read_by_name_age(int(dob), name)
        elif name:
            return read_by_name(name)
        elif city:
            return read_by_city(city)
        else:
            return read()

    elif request.method == 'PUT':
        name = request.args.get("name", None)
        city = request.args.get("City", None)
        email = request.args.get("email", None)
        mobile = request.args.get("Mobile", None)
        if name and city:
            update_by_name_city(name, city)
            return "Data is updated"
        elif name and email:
            update_by_name_email(name, email)
            return {"Message": "Data is updated"}
        elif name and mobile:
            update_by_name_mobile(name, mobile)
            return "Data is updated"

    else:
        name = request.args.get("Name", None)
        count = delete(name=name)
        return "{} rows were affected".format(count)
