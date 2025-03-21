# Use an official Python runtime as a base image
FROM python:3.12.9

# Set the working directory
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Install netcat (use netcat-openbsd for Alpine-based images)
RUN apt-get update && apt-get install -y netcat-openbsd

# Copy all files into the container
COPY . /app

# Copy the entrypoint script and give execution permissions
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose Flask ports
EXPOSE 5000

# Run the entrypoint script
CMD ["/entrypoint.sh"]
