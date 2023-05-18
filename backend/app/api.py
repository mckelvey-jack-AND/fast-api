from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from queries.correct_answers import get_correct_answers


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
    
    quiz_rounds_object = {}
    for answer in answers:
        quiz_round = answer['rounds']
        difficulty = answer['difficulty']
        total_correct = int(answer['total_correct'])

        if quiz_round not in quiz_rounds_object:
            quiz_rounds_object[quiz_round] = {'easy': 0, 'medium': 0, 'hard': 0}

        quiz_rounds_object[quiz_round][difficulty.lower()] = total_correct

    quiz_rounds = []
    for quiz_round in quiz_rounds_object:
        quiz_rounds.append({
            quiz_round: quiz_rounds_object[quiz_round]
        })

    # [{'quiz_1': {'easy': 36, 'medium': 27, 'hard': 9}},
    #  {'quiz_2': {'easy': 32, 'medium': 19, 'hard': 7}}...]
    return {"data":quiz_rounds}
  

