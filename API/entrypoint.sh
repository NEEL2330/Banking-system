#!/bin/sh

# Wait for MySQL to be ready
echo "Waiting for MySQL to start..."
until nc -z -v -w30 db-container 3306
do
  echo "Waiting for MySQL..."
  sleep 5
done

echo "MySQL is up - starting Flask app."
exec python handler/app.py
