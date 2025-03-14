from flask import Flask, request
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from db.transaction import trasnsaction, read, read_by_account_no, read_by_transaction_id, add_balance, subtract_balance

app = Flask(__name__)
@app.route('/transaction', methods = ['PUT','GET'])
def transaction_route():
    if request.method=='PUT':
        body=request.json
        from_account_no=body["from_account_no"]
        to_account_no=body["to_account_no"]
        amount=body["amount"]
        trasnsaction(from_account_no, to_account_no, amount)
        return "Transaction successfully done"
    else:
        transaction_id=request.args.get("transaction_id")
        account_no=request.args.get("account_no")
        if transaction_id:
            data=read_by_transaction_id(int(transaction_id))
            return data
        elif account_no: 
            data=read_by_account_no(account_no)
            return data
        else:
            data=read()
            return data 

if __name__ == '__main__':
    app.run(debug=True)