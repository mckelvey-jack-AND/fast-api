from database import connectDB


def get_squad_results(squadName, isBest=True):
    connection = connectDB()
    query = f"""
    SELECT squad, position, count(position) as occurrences from (SELECT 
    rounds.rounds,
    users.squad,
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
    GROUP BY squad, rounds
    ORDER BY rounds, total_score DESC) as sub
    where squad = '{squadName}' and position in (select {"min" if isBest else "max"}(position) from (SELECT 
    rounds.rounds,
    users.squad,
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
    GROUP BY squad, rounds
    ORDER BY rounds) main
	where squad = '{squadName}'
	GROUP BY squad)
    """
    cursor = connection.cursor()
    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close()
    connection.close()
    return data


def get_individual_results(user_id, isBest=True):
    connection = connectDB()
    query = f"""
    SELECT user_id, position, count(position) as occurrences from (SELECT 
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
where user_id = 1 and position in (select {"min" if isBest else "max"}(position) from (SELECT 
    rounds.rounds,
    user_id,
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
    ORDER BY rounds) main
	where user_id = {user_id}
	GROUP BY user_id)
    """
    cursor = connection.cursor()
    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close()
    connection.close()
    return data
