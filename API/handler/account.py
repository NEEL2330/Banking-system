from flask import Flask, request
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from db.account import create_account, read, read_account_balance_by_account_no, delete_account, update_balance_by_accountid

app = Flask(__name__)
@app.route('/account', methods = ['POST','PUT','GET','DELETE'])

def account_route():
    if request.method == 'GET':
        account_no=request.args.get("account_no")
        if account_no:
            data = read_account_balance_by_account_no(account_no)
            return data
        else:
            data=read()
            return data
        
    elif request.method == 'POST':
        body = request.json
        customer_id=body["customer_id"]
        account_no=body["account_no"]
        balance=body["Balance"]
        create_account(customer_id,account_no,balance)
        return "Account details addedd successfully"
    
    elif request.method == 'PUT':
        body = request.json
        balance=body["Balance"]
        account_id=body["account_id"]
        update_balance_by_accountid(account_id,balance)
        return "Account detail updated" 
    
    else:
        body = request.json
        account_id=body["account_id"]
        count=delete_account(account_id) 
        return "{} rows were affected".format(count)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)

