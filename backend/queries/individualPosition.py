from database import connectDB

def get_individual_position_in_club(user_id):
    connection = connectDB()        
    
    query = f'''
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

    cursor = connection.cursor()
    cursor.execute(query)
    data = cursor.fetchall()
    return data

def get_individual_position_in_squad(user_id):
    connection = connectDB()        
    
    query = f'''
    SELECT user_id, rounds, position
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
            -- Additional condition to filter by user's squad
            INNER JOIN users user_filter ON user_filter.squad = users.squad
        WHERE
            user_filter.ID = %s
        GROUP BY user_id, rounds
        ORDER BY rounds, SUM(answers.is_correct) DESC
        ) AS ranked_results
        WHERE user_id = %s
        ) AS filtered_results
     ORDER BY rounds DESC
     limit 2
    '''

    cursor = connection.cursor()
    cursor.execute(query, (user_id, user_id))
    data = cursor.fetchall()
    return data

