# Use an official Python runtime as a base image
FROM python:3.12.9

# Set the working directory
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy all files into the container
COPY API/ .

# Expose the Flask port
EXPOSE 5000 5001 5002


# Run all three Flask apps using Gunicorn in parallel
CMD ["sh", "-c", "sleep 10 && python handler/main.py & python handler/main2.py & python handler/main3.py && wait"]
