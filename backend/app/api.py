from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from queries.correct_answers import get_correct_answers
from helpers.correct_answer_fotmat import group_by_rounds
from queries.question_difficulty import get_easiest_question, get_hardest_question

app = FastAPI()

origins = ["http://localhost:3000", "localhost:3000"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Hello world."}


@app.get("/correct-answers", tags=["root"])
async def read_correct_answers() -> dict:
    answers = get_correct_answers()

    quiz_rounds = group_by_rounds(answers)

    return {"data": quiz_rounds}


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
