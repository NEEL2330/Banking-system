from flask import Flask
from account import account_bp
from customer import customer_bp
from transaction import transaction_bp
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


app = Flask(__name__)

# Register Blueprints
app.register_blueprint(account_bp)
app.register_blueprint(customer_bp)
app.register_blueprint(transaction_bp)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
