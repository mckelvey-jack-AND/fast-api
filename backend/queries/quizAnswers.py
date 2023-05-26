from database import connectDB

def post_quiz_answers(received_answers, roundId, questionId,answerId):
    connection = connectDB()
    
    try:
        cursor = connection.cursor()
  
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