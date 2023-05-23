from database import connectDB


def  get_individual_score_overtime(user_id):
    connection = connectDB()
    query = f"""
    SELECT user_id, first_name, last_name, rounds, total_score, position from (SELECT 
    user_id,
    users.first_name,
    users.last_name,
    rounds.rounds,
    SUM(answers.is_correct) AS 'total_score',
    RANK() OVER(PARTITION BY rounds ORDER BY SUM(answers.is_correct) DESC) 'position'
    FROM
    user_answers
        LEFT JOIN
    users ON users.ID = user_answers.user_id
        LEFT JOIN
    answers ON answers.id = user_answers.answer_id
    LEFT JOIN
    rounds ON rounds.id = user_answers.rounds_id
    WHERE
    answers.is_correct = 1
    GROUP BY user_id, rounds
    ORDER BY rounds, SUM(answers.is_correct) DESC) as sub
    where user_id = {user_id}
    """
    cursor = connection.cursor()
    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close()
    connection.close()
    return data

