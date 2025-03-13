from flask import Flask, request
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from db.transaction import trasnsaction, read, read_by_account_no, read_by_transaction_id, add_balance, subtract_balance

app = Flask(__name__)
@app.route('/transaction', methods = ['PUT'])
def transaction_route():
    body=request.json
    from_account_no=body["from_account_no"]
    to_account_no=body["to_account_no"]
    amount=body["amount"]
    trasnsaction(from_account_no, to_account_no, amount)
    return "Transaction successfully done"

@app.route('/transaction_read', methods = ['GET'])  # In body parameter, if there is more than 1 body parameter than we can use get method to display the result. Instead we have to use query parameter to use get method.
def transaction_read():
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