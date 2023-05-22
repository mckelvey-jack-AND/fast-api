from database import connectDB

def get_hardest_question(round_id= 1):
    connection = connectDB()
    query = f'''
    SELECT
    r.rounds
    ,q.difficulty
    ,sum(a.is_correct) as total_correct
    ,q.id as q
    ,q.question_text
    ,a.answer_text
	-- ,u.squad
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
        WHERE r.id = {round_id}
    group by
    r.rounds
    ,q.id
	,q.difficulty
   --  ,u.squad
   ,q.question_text
    ,a.answer_text
    ORDER BY rounds,total_correct asc, q
    LIMIT 1
    '''
    cursor = connection.cursor()
    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close()
    connection.close()
    return data


def get_easiest_question(round_id= 1):
    connection = connectDB()
    query = f'''
    SELECT
    r.rounds
    ,q.difficulty
    ,sum(a.is_correct) as total_correct
    ,q.id as q
    ,q.question_text
    ,a.answer_text
	-- ,u.squad
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
        WHERE r.id = {round_id}
    group by
    r.rounds
    ,q.id
	,q.difficulty
   --  ,u.squad
   ,q.question_text
    ,a.answer_text
    ORDER BY rounds,total_correct desc, q
    LIMIT 1
    '''
    cursor = connection.cursor()
    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close()
    connection.close()
    return data