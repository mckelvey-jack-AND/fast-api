from database import connectDB

def get_leaderboard_data(type):
    connection = connectDB()        

    # Leaderboard SQL query
    user_query = f'''
    SELECT user_id,users.first_name,users.last_name,users.squad, SUM(answers.is_correct) AS "total score" FROM user_answers
    LEFT JOIN users ON users.ID = user_answers.user_id
    LEFT JOIN answers ON answers.id = user_answers.answer_id
    WHERE answers.is_correct =1
    GROUP BY user_id
    ORDER BY SUM(answers.is_correct) DESC
    LIMIT 10;
    '''

    squad_query = f'''
    SELECT users.squad, SUM(answers.is_correct) AS "total score" FROM user_answers
    LEFT JOIN users ON users.ID = user_answers.user_id
    LEFT JOIN answers ON answers.id = user_answers.answer_id
    WHERE answers.is_correct =1
    GROUP BY squad
    ORDER BY SUM(answers.is_correct) DESC
    LIMIT 10;
    '''

    query = squad_query if type == 'squad' else user_query
    cursor = connection.cursor()
    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close()
    connection.close()

    return data