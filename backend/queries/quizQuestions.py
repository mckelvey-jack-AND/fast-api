from database import connectDB


def get_quiz_data():
    connection = connectDB()
    questions_query = f"""
    SELECT questions.question_text, answers.answer_text, questions.id As question_id, answers.id As answer_id, rounds.id As round_id, answers.is_correct AS isCorrect  FROM questions
    JOIN answers ON questions.id = answers.question_id
    JOIN rounds ON  quiz_id = rounds.id
    ORDER BY questions.id DESC,RAND()
    LIMIT 40;
    """
    cursor = connection.cursor()
    cursor.execute(questions_query)
    data = cursor.fetchall()
    cursor.close()
    connection.close()

    return data
