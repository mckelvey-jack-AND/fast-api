from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from queries.correct_answers import get_correct_answers
from helpers.correct_answer_fotmat import group_by_rounds
from queries.question_difficulty import get_easiest_question, get_hardest_question
from queries.leaderboard import get_leaderboard_data
from queries.quizQuestions import get_quiz_data
from queries.individualPosition import get_individual_position
from queries.quizAnswers import post_quiz_answers
from pydantic import BaseModel
from typing import List
from queries.score_overtime import (
    get_individual_score_overtime,
    get_squad_score_overtime,
)
from queries.best_and_worse_results import get_squad_results, get_individual_results

app = FastAPI()


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


@app.post("/answers")
async def handle_answers(answer: Answer):
    received_answers = answer.answers
    roundId = answer.roundId
    questionId = answer.questionId
    answerId = answer.answerId
    response_data = post_quiz_answers(received_answers, roundId, questionId, answerId)
    return {"data": response_data}


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Hello world."}


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

<<<<<<< HEAD
@app.get("/individual-position")
def read_leaderboard_score_overtime(): 
    individual_position = (
        get_individual_position(1)
    )
    return {
        "data": individual_position,
    }
=======

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
async def read_leaderboard_score_overtime(type: str) -> dict:
    if type != "squad" and type != "individual":
        raise HTTPException(status_code=404, detail="Type must be individual or squad")

    leaderboard_score_overtime = (
        get_individual_score_overtime(1)
        if type == "individual"
        else get_squad_score_overtime("squad_1")
    )
    return {
        "data": leaderboard_score_overtime,
    }


@app.get("/best-results-and-worst-results")
async def read_best_results_and_worst_results(type: str) -> dict:
    if type != "squad" and type != "individual":
        raise HTTPException(status_code=404, detail="Type must be individual or squad")

    best_results = (
        get_squad_results(True) if type == "squad" else get_individual_results(True)
    )
    worst_result = (
        get_squad_results(False) if type == "squad" else get_individual_results(False)
    )

    return {
        "data": {
            "best_result": best_results[0],
            "worst_result": worst_result[0],
        }
    }
>>>>>>> feature/ons-48/add-easy-hardest-question-visualisations
