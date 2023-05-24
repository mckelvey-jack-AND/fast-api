from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from queries.correct_answers import get_correct_answers
from helpers.correct_answer_fotmat import group_by_rounds
from queries.leaderboard import get_leaderboard_data
from queries.quizQuestions import get_quiz_data
from queries.quizAnswers import post_quiz_answers
from pydantic import BaseModel
from typing import List

app = FastAPI()


origins = ["http://localhost:3000", "localhost:3000", "http://localhost:3001"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Answer(BaseModel):
    answers: List[str]

@app.post("/answers")
async def handle_answers(answer: Answer):
    received_answers = answer.answers
    response_data = post_quiz_answers(received_answers)
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
def get_data(type: str):
    if type != "squad" and type != "individual":
        raise HTTPException(status_code=404, detail="Type must be individual or squad")

    data = get_leaderboard_data(type)
    return {"data": data}

@app.get("/quiz")
def get_data(): 
    data = get_quiz_data()
    return {"data": data}
