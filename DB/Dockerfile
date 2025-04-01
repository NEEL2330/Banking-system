# Use the official MySQL 8 image as the base image
FROM mysql:8.0

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=Neelbera@2330
ENV MYSQL_DATABASE=banking_system

# Copy SQL files into the container's initialization directory
COPY ./Scripts/*.sql /docker-entrypoint-initdb.d/

# Expose MySQL port
EXPOSE 3306
