from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from queries.correct_answers import get_correct_answers
from helpers.correct_answer_fotmat import group_by_rounds

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
