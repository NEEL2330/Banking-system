#!/bin/sh

echo "Waiting for MySQL to be ready..."
while ! nc -z mysql-container 3306; do
    echo "Waiting for MySQL..."
    sleep 5
done

echo "MySQL is up! Starting Flask apps..."
python handler/account.py &
python handler/customer.py &
python handler/transaction.py

# Keep the container running
wait
