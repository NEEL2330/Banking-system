from flask import Flask, request
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from db.account import create_account, read, read_account_balance_by_account_no, delete_account, update_balance_by_accountid

app = Flask(__name__)
@app.route('/account', methods = ['POST'])
def create_account_route():
    body = request.json
    customer_id=body["customer_id"]
    account_no=body["account_no"]
    account_balance=body["Balance"]
    create_account(customer_id,account_no,account_balance)
    return "Account details addedd successfully"

@app.route('/account_get', methods = ['GET'])
def read_account():
    body=request.json
    account_no=body["account_no"]
    if account_no:
        data=read_account_balance_by_account_no(account_no)
        return data
    else:
        data=read()
        return data

@app.route('/account_update', methods = ['PUT'])
def update_account():
    body=request.json
    account_id=body["account_id"]
    balance=body["balance"]
    update_balance_by_accountid(account_id,balance)
    return "Account detail updated" 

@app.route('/account_delete', methods = ['DELETE'])
def delete_account_route():
    body=request.json
    account_id=body["account_id"]
    count=delete_account(account_id) 
    return "{} rows were affected".format(count)

if __name__ == '__main__':
    app.run(debug=True)
