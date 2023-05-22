import pymysql
from dotenv import load_dotenv
import os

load_dotenv('../.env')

# Establish a connection to the Google Cloud MySQL database
db_host = os.environ.get('DB_HOST')
db_user = os.environ.get('DB_USER')
db_password = os.environ.get('DB_PASSWORD')
db_name = os.environ.get('DB_NAME')


def get_quiz_data():
    connection = pymysql.connect(
    host=db_host,
    user=db_user,
    password=db_password,
    database=db_name,
    cursorclass=pymysql.cursors.DictCursor
    )

    cursor = connection.cursor()

    questions_query = f'''
    SELECT questions.question_text, answers.answer_text, MAX(answers.is_correct) as isCorrect FROM user_answers
    LEFT JOIN questions ON questions.id = user_answers.question_id
    LEFT JOIN answers ON answers.id = user_answers.answer_id
    GROUP BY questions.question_text, answers.answer_text
    ORDER BY questions.question_text
    LIMIT 40;
    '''

    cursor.execute(questions_query)
    data = cursor.fetchall()
    cursor.close()
    connection.close()

    return data