from flask import Flask, request
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from db.customer import create_customer, read, delete, read_by_name, update_by_id_city, update_by_id_email, update_by_id_mobile
        

app = Flask(__name__)
@app.route('/test', methods = ['POST'])
def create_route():
    body=request.json
    name=body["Name"]
    city=body["City"]
    mobile=body["Mobile"]
    email=body["Email"]
    dob=body["dob"]
    create_customer(name=name,city=city,mobile=mobile,email=email,dob=dob)
    return "Customer details addedd successfully"

if __name__ == '__main__':
    app.run(debug=True)