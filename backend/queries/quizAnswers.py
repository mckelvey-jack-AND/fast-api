from database import connectDB


def post_quiz_answers(received_answers, roundId, questionId, answerId, userId):
    connection = connectDB()

    try:
        cursor = connection.cursor()

        for round, question, answerId, userId in zip(
            roundId, questionId, answerId, userId
        ):
            insert_query = "INSERT INTO user_answers (rounds_id, question_id, answer_id, user_id) VALUES (%s, %s, %s, %s)"
            cursor.execute(insert_query, (round, question, answerId, userId))

        connection.commit()

        response_data = {"message": "Answers posted successfully"}
        return response_data

    except Exception as e:
        response_data = {"error": str(e)}
        return response_data

    finally:
        connection.close()
