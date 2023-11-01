# Use an official Python runtime as the base image
FROM python:3.8

# Set the working directory in the container
WORKDIR /app

# Copy your project files into the container
COPY . /app

# Install any required dependencies (modify the file name if needed)
RUN pip install -r requirements.txt

# Expose the port your application will listen on
EXPOSE 80

# Specify the command to run your application
CMD ["python", "app.py"]

