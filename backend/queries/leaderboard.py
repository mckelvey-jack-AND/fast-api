import pymysql
from dotenv import load_dotenv
import os

load_dotenv('../.env')

# Establish a connection to the Google Cloud MySQL database
db_host = os.environ.get('DB_HOST')
db_user = os.environ.get('DB_USER')
db_password = os.environ.get('DB_PASSWORD')
db_name = os.environ.get('DB_NAME')


def get_leaderboard_data(type):
    connection = pymysql.connect(
    host=db_host,
    user=db_user,
    password=db_password,
    database=db_name,
    cursorclass=pymysql.cursors.DictCursor
    )

    cursor = connection.cursor()

    # Leaderboard SQL query
    user_query = f'''
    SELECT user_id,users.first_name,users.last_name,users.squad, SUM(answers.is_correct) AS "total score" FROM user_answers
    LEFT JOIN users ON users.ID = user_answers.user_id
    LEFT JOIN answers ON answers.id = user_answers.answer_id
    WHERE answers.is_correct =1
    GROUP BY user_id
    ORDER BY SUM(answers.is_correct) DESC
    LIMIT 10;
    '''

    squad_query = f'''
    SELECT users.squad, SUM(answers.is_correct) AS "total score" FROM user_answers
    LEFT JOIN users ON users.ID = user_answers.user_id
    LEFT JOIN answers ON answers.id = user_answers.answer_id
    WHERE answers.is_correct =1
    GROUP BY squad
    ORDER BY SUM(answers.is_correct) DESC
    LIMIT 10;
    '''

    query = squad_query if type == 'squad' else user_query

    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close()
    connection.close()

    return data