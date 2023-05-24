import pymysql
from dotenv import load_dotenv
import os

load_dotenv('../.env')

# Establish a connection to the Google Cloud MySQL database
db_host = os.environ.get('DB_HOST')
db_user = os.environ.get('DB_USER')
db_password = os.environ.get('DB_PASSWORD')
db_name = os.environ.get('DB_NAME')


def post_quiz_answers(received_answers, roundId, questionId,answerId):
    connection = pymysql.connect(
    host=db_host,
    user=db_user,
    password=db_password,
    database=db_name,
    cursorclass=pymysql.cursors.DictCursor
    )

    cursor = connection.cursor()
    
    try:
        cursor = connection.cursor()
        
        # for received_answer in received_answers:
        #     insert_query = "INSERT INTO answers (answer_text) VALUES (%s)"
        #     cursor.execute(insert_query, (received_answer))

        for round, question, answerId in zip(roundId, questionId, answerId):
            insert_query = "INSERT INTO user_answers (rounds_id, question_id, answer_id, user_id) VALUES (%s, %s, %s, 1)"
            cursor.execute(insert_query, (round, question, answerId))

        connection.commit()

        response_data = {"message": "Answers posted successfully"}
        return response_data
    
    except Exception as e:
        response_data = {"error": str(e)}
        return response_data
    
    finally:
        connection.close()