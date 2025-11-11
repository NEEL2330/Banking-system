#!/bin/sh

# Wait for MySQL to be ready
echo "Waiting for MySQL to start..."
until nc -z -v -w30 db_container_test 3306
do
  echo "Waiting for MySQL..."
  sleep 5
done

echo "MySQL is up - starting Flask app."
exec python handler/app.py
