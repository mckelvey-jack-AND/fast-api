from correct_answer_fotmat import group_by_rounds, get_quiz_categories, get_rounds

answers_from_db = [
    {
        "rounds": "quiz_1",
        "difficulty": "Easy",
        "total_correct": "1",
    },
    {
        "rounds": "quiz_1",
        "difficulty": "Medium",
        "total_correct": "2",
    },
    {
        "rounds": "quiz_1",
        "difficulty": "Hard",
        "total_correct": "3",
    },
    {
        "rounds": "quiz_2",
        "difficulty": "Easy",
        "total_correct": "4",
    },
    {
        "rounds": "quiz_2",
        "difficulty": "Medium",
        "total_correct": "5",
    },
    {
        "rounds": "quiz_2",
        "difficulty": "Hard",
        "total_correct": "6",
    },
]


quiz_categories = {
    "quiz_1": {
        "easy": 1,
        "medium": 2,
        "hard": 3,
    },
    "quiz_2": {
        "easy": 4,
        "medium": 5,
        "hard": 6,
    },
}

answers_for_graph = [
    {
        "name": "quiz_1",
        "easy": 1,
        "medium": 2,
        "hard": 3,
    },
    {
        "name": "quiz_2",
        "easy": 4,
        "medium": 5,
        "hard": 6,
    },
]


def test_group_by_rounds():
    quiz_rounds = group_by_rounds(answers_from_db)

    assert quiz_rounds == answers_for_graph


def test_get_quiz_categories():
    quiz_rounds_categories = get_quiz_categories(answers_from_db)

    assert quiz_rounds_categories == quiz_categories


def test_get_rounds():
    quiz_rounds = get_rounds(quiz_categories)

    assert quiz_rounds == answers_for_graph
