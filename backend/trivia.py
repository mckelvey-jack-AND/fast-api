import pymysql
from dotenv import load_dotenv
import os
import requests
import json

load_dotenv('../.env')

# Establish a connection to the Google Cloud MySQL database
db_host = os.environ.get('DB_HOST')
db_user = os.environ.get('DB_USER')
db_password = os.environ.get('DB_PASSWORD')
db_name = os.environ.get('DB_NAME')
print(db_name)

connection = pymysql.connect(
    host=db_host,
    user=db_user,
    password=db_password,
    database=db_name,
)

# Make an API request to get 10 questions from trivia api
response = requests.get('https://opentdb.com/api.php?amount=10')
data = json.loads(response.text)
print(data)

try:
    # Create a cursor object
    cursor = connection.cursor()

    # Execute the SELECT statement
    cursor.execute('SELECT * FROM users')

    # Fetch all rows from the result set
    rows = cursor.fetchall()

    # Print the table
    for row in rows:
        print(row)

finally:
    # Close the cursor and connection
    cursor.close()
    connection.close()