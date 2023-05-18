import pymysql
from dotenv import load_dotenv
import os
import requests
import json
from datetime import datetime


load_dotenv('../../.env')

# Establish a connection to the Google Cloud MySQL database
db_host = os.environ.get('DB_HOST')
db_user = os.environ.get('DB_USER')
db_password = os.environ.get('DB_PASSWORD')
db_name = os.environ.get('DB_NAME')


connection = pymysql.connect(
    host=db_host,
    user=db_user,
    password=db_password,
    database=db_name,
)

# Make an API request to get 10 questions from trivia api
url = 'https://opentdb.com/api.php'
params = {
    'amount': 10,
    'type': 'multiple'
}
response = requests.get(url, params=params)
data = response.json()['results']


cursor = connection.cursor()
cursor.execute("SELECT MAX(quiz_id) FROM questions")
max_quiz_id = cursor.fetchone()[0]

 # Set the initial quiz_id for the new questions
if max_quiz_id is None:
    quiz_id = 1
else:
    quiz_id = max_quiz_id + 1

quiz_text="quiz_"+str(quiz_id)
current_date_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
sql_rounds = f"INSERT INTO rounds (rounds, date) VALUES ('{quiz_text}','{current_date_time}')"
cursor.execute(sql_rounds)
question_id=((quiz_id-1)*10)+1

for question in data:
    question_text = question['question']
    correct_answer = question['correct_answer']
    incorrect_answers = question['incorrect_answers']
    category = question['category']
    difficulty = question['difficulty']
    answer_choices = [correct_answer] + incorrect_answers
    is_correct = [1,0,0,0]
    sql_questions = f"INSERT INTO questions (quiz_id, question_text, category, difficulty) VALUES ({quiz_id},'{question_text}','{category}','{difficulty}')"
    cursor.execute(sql_questions)
    for i in range(4):
        sql_answers = f"INSERT INTO answers (question_id, answer_text, is_correct) VALUES ({question_id},'{answer_choices[i]}',{is_correct[i]})"
        cursor.execute(sql_answers)

    answer_choices=[]
    question_id=question_id+1 
   

# Commit the changes and close the connection
connection.commit()
connection.close()
