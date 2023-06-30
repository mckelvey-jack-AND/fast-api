from fastapi import FastAPI, HTTPException, Response, status
from fastapi.middleware.cors import CORSMiddleware
from queries.correct_answers import get_correct_answers
from helpers.correct_answer_fotmat import group_by_rounds
from queries.question_difficulty import get_easiest_question, get_hardest_question
from queries.leaderboard import get_leaderboard_data
from queries.quizQuestions import get_quiz_data
from queries.individualPosition import (
    get_individual_position_in_club,
    get_individual_position_in_squad,
)
from queries.quizAnswers import post_quiz_answers
from pydantic import BaseModel
from typing import List
from queries.score_overtime import (
    get_individual_score_overtime,
    get_squad_score_overtime,
)
from queries.best_and_worse_results import get_squad_results, get_individual_results
from queries.get_user import get_user
from mangum import Mangum

app = FastAPI()
handler = Mangum(app)


origins = ["http://localhost:3000", "localhost:3000"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Answer(BaseModel):
    answers: List[str]
    roundId: List[str]
    questionId: List[str]
    answerId: List[str]
    userId: List[str]


@app.post("/answers")
async def handle_answers(answer: Answer):
    received_answers = answer.answers
    roundId = answer.roundId
    questionId = answer.questionId
    answerId = answer.answerId
    userId = answer.userId

    response_data = post_quiz_answers(
        received_answers, roundId, questionId, answerId, userId
    )
    return {"data": response_data}


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Hello world."}


@app.post("/user")
async def read_current_user(user_email: dict, response: Response) -> dict:
    user = get_user(user_email["user_email"])

    if not user:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"data": "User not found"}
    return {"data": user[0]}


@app.get("/correct-answers")
def read_correct_answers():
    answers = get_correct_answers()

    quiz_rounds = group_by_rounds(answers)

    return {"data": quiz_rounds}


@app.get("/leaderboard")
def get_leaderboard(type: str):
    if type != "squad" and type != "individual":
        raise HTTPException(status_code=404, detail="Type must be individual or squad")

    data = get_leaderboard_data(type)
    return {"data": data}


@app.get("/quiz")
def get_quiz():
    data = get_quiz_data()
    return {"data": data}


@app.get("/individual-position")
def read_leaderboard_position(user_id: str):
    position_in_club = get_individual_position_in_club(user_id)
    position_in_squad = get_individual_position_in_squad(user_id)
    return {
        "data": {
            "position_in_squad": position_in_squad,
            "position_in_club": position_in_club,
        }
    }


@app.get("/individual-questions-difficulty", tags=["root"])
async def read_question_difficulty() -> dict:
    hardest_question = get_hardest_question()
    easiest_question = get_easiest_question()

    return {
        "data": {
            "hardest_question": hardest_question[0],
            "easiest_question": easiest_question[0],
        }
    }


@app.get("/leaderboard-score-overtime")
async def read_leaderboard_score_overtime(
    type: str, user_id: str, squad_name: str
) -> dict:
    if type != "squad" and type != "individual":
        raise HTTPException(status_code=404, detail="Type must be individual or squad")

    leaderboard_score_overtime = (
        get_individual_score_overtime(user_id)
        if type == "individual"
        else get_squad_score_overtime(squad_name)
    )
    return {
        "data": leaderboard_score_overtime,
    }


@app.get("/best-results-and-worst-results")
async def read_best_results_and_worst_results(
    type: str, squadName: str, user_id: str
) -> dict:
    if type != "squad" and type != "individual":
        raise HTTPException(status_code=404, detail="Type must be individual or squad")

    best_results = (
        get_squad_results(squadName, True)
        if type == "squad"
        else get_individual_results(user_id, True)
    )
    worst_result = (
        get_squad_results(squadName, False)
        if type == "squad"
        else get_individual_results(user_id, False)
    )

    return {
        "data": {
            "best_result": best_results[0],
            "worst_result": worst_result[0],
        }
    }
