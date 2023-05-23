from database import connectDB


def get_hardest_question(round_id=1):
    connection = connectDB()
    query = f"""
    SELECT 
        rounds,
        question,
        question_text,
        difficulty,
        total_correct,
        answer_text
    FROM
        answers
            INNER JOIN
        (SELECT 
            r.rounds,
                q.id AS question,
                q.question_text,
                q.difficulty,
                COALESCE(SUM(a.is_correct), 0) AS total_correct
        FROM
            user_answers AS ua
        LEFT JOIN users AS u ON u.id = ua.user_id
        LEFT JOIN questions AS q ON q.id = ua.question_id
        LEFT JOIN answers AS a ON a.id = ua.answer_id
        LEFT JOIN rounds AS r ON r.id = ua.rounds_id
        WHERE
            r.id = {round_id}
        GROUP BY r.rounds , q.difficulty , question , q.question_text
        ORDER BY rounds , total_correct ASC , question) query ON query.question = answers.question_id
    WHERE
        answers.is_correct
    LIMIT 1
    """
    cursor = connection.cursor()
    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close()
    connection.close()
    return data


def get_easiest_question(round_id=1):
    connection = connectDB()
    query = f"""
    SELECT 
        rounds,
        question,
        question_text,
        difficulty,
        total_correct,
        answer_text
    FROM
        answers
            INNER JOIN
        (SELECT 
            r.rounds,
                q.id AS question,
                q.question_text,
                q.difficulty,
                COALESCE(SUM(a.is_correct), 0) AS total_correct
        FROM
            user_answers AS ua
        LEFT JOIN users AS u ON u.id = ua.user_id
        LEFT JOIN questions AS q ON q.id = ua.question_id
        LEFT JOIN answers AS a ON a.id = ua.answer_id
        LEFT JOIN rounds AS r ON r.id = ua.rounds_id
        WHERE
            r.id = {round_id}
        GROUP BY r.rounds , q.difficulty , question , q.question_text
        ORDER BY rounds , total_correct DESC , question) query ON query.question = answers.question_id
    WHERE
        answers.is_correct
    LIMIT 1
    """
    cursor = connection.cursor()
    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close()
    connection.close()
    return data
