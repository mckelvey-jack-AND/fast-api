def group_by_rounds(answers: list) -> list:
    quiz_rounds_categories = get_quiz_categories(answers)
    quiz_rounds = get_rounds(quiz_rounds_categories)

    return quiz_rounds


def get_quiz_categories(answers: list) -> dict:
    quiz_rounds_categories = {}
    for answer in answers:
        quiz_round = answer["rounds"]
        difficulty = answer["difficulty"]
        total_correct = int(answer["percentage_correct"])

        if quiz_round not in quiz_rounds_categories:
            quiz_rounds_categories[quiz_round] = {"easy": 0, "medium": 0, "hard": 0}

        quiz_rounds_categories[quiz_round][difficulty.lower()] = total_correct
    return quiz_rounds_categories


def get_rounds(quiz_rounds_object: dict) -> list:
    quiz_rounds = []
    for quiz_round in quiz_rounds_object:
        quiz_rounds.append(
            {
                "name": quiz_round,
                "easy": quiz_rounds_object[quiz_round]["easy"],
                "medium": quiz_rounds_object[quiz_round]["medium"],
                "hard": quiz_rounds_object[quiz_round]["hard"],
            }
        )
    return quiz_rounds
