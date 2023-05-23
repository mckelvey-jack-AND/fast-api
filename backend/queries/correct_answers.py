from database import connectDB

def get_correct_answers():
    connection = connectDB()
    query = f'''
    SELECT
    r.rounds
    ,q.difficulty
    ,sum(a.is_correct) as total_correct 
    FROM
        user_answers AS ua
            LEFT JOIN
        users AS u ON u.id = ua.user_id
            LEFT JOIN
        questions AS q ON q.id = ua.question_id
            LEFT JOIN
        answers AS a ON a.id = ua.answer_id
            LEFT JOIN
        rounds AS r ON r.id = ua.rounds_id
    group by
    r.rounds
    ,q.difficulty
    '''
    cursor = connection.cursor()
    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close()
    connection.close()
    return data