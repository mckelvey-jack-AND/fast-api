from database import connectDB


def get_user(email):
    connection = connectDB()
    query = f"""
       SELECT
    users.id,
    users.first_name,
    users.last_name,
    users.squad,
    CASE
        WHEN r.id IS NULL THEN 0
        ELSE 1
    END AS has_taken_most_recent_quiz
FROM
    users
        LEFT JOIN
    user_answers ua ON ua.user_id = users.id
        LEFT JOIN
    rounds r ON r.id = ua.rounds_id
        AND r.rounds = 'quiz_1'
WHERE
    users.email = %s
GROUP BY users.id , r.id

"""
    cursor = connection.cursor()
    cursor.execute(query, (email,))
    data = cursor.fetchall()
    cursor.close()
    connection.close()
    return data
