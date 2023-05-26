from database import connectDB

def get_individual_position(user_id):
    connection = connectDB()        

    
    user_position_within_all = f'''
   SELECT user_id,  rounds, position
   FROM (
    SELECT user_id, first_name, last_name, rounds, total_score, position
    FROM (
        SELECT
            user_id,
            users.first_name,
            users.last_name,
            rounds.rounds,
            SUM(answers.is_correct) AS 'total_score',
            RANK() OVER(PARTITION BY rounds ORDER BY SUM(answers.is_correct) DESC) 'position'
        FROM
            user_answers
            LEFT JOIN users ON users.ID = user_answers.user_id
            LEFT JOIN answers ON answers.id = user_answers.answer_id
            LEFT JOIN rounds ON rounds.id = user_answers.rounds_id
        WHERE
            answers.is_correct = 1
        GROUP BY user_id, rounds
        ORDER BY rounds, SUM(answers.is_correct) DESC
    ) AS ranked_results
    WHERE user_id = {user_id}
    ) AS filtered_results
    ORDER BY rounds DESC
    LIMIT 2;
    '''

    user_position_within_squad = f'''
    SELECT user_id, rounds, position
    FROM (
        SELECT
        user_id,
        rounds,
        total_score,
        RANK() OVER (PARTITION BY squad ORDER BY total_score DESC) AS position
        FROM (
        SELECT
            ua.user_id,
            r.rounds,
            SUM(a.is_correct) AS total_score,
            u.squad
        FROM user_answers ua
        JOIN rounds r ON ua.rounds_id = r.id
        JOIN answers a ON ua.answer_id = a.id
        JOIN users u ON ua.user_id = u.id
        WHERE ua.user_id = {user_id}
        GROUP BY ua.user_id, r.rounds, u.squad
        ORDER BY r.rounds DESC
        LIMIT 2
    ) AS scores
    ) AS ranked_results;
    '''

    cursor = connection.cursor()
    cursor.execute(user_position_within_all)
    data1 = cursor.fetchall()

    cursor.execute(user_position_within_squad)
    data2 = cursor.fetchall()

    data = data1+data2
    cursor.close()
    connection.close()

    return data