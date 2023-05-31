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
        AND r.rounds = (select rounds from rounds order by date desc limit 1)
WHERE
    users.email = %s
GROUP BY users.id , r.id
order by has_taken_most_recent_quiz desc
limit 1

"""
    cursor = connection.cursor()
    cursor.execute(query, (email,))
    data = cursor.fetchall()
    cursor.close()
    connection.close()
    return data
