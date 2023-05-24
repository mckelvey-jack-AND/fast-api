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
    SELECT questions.question_text, answers.answer_text, questions.id As question_id, answers.id As answer_id, rounds.id As round_id, answers.is_correct AS isCorrect  FROM questions
    JOIN answers ON questions.id = answers.question_id
    JOIN rounds ON  quiz_id = rounds.id
    ORDER BY questions.id DESC,RAND()
    LIMIT 40;
    '''

    cursor.execute(questions_query)
    data = cursor.fetchall()
    cursor.close()
    connection.close()

    return data