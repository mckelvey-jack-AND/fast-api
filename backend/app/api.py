from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from queries.leaderboard import get_leaderboard_data

app = FastAPI()

origins = ["http://localhost:3000", "localhost:3000"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# query=f'''
# SELECT user_id,users.first_name,users.last_name,users.squad, SUM(answers.is_correct) AS "total score" FROM user_answers
# LEFT JOIN users ON users.ID = user_answers.user_id
# LEFT JOIN answers ON answers.id = user_answers.answer_id
# WHERE answers.is_correct =1
# GROUP BY user_id
# ORDER BY SUM(answers.is_correct) DESC
# LIMIT 10;
# '''

@app.get("/", tags=["root"])
async def read_root() -> dict:
    
    return {"message": "Hello world."}

@app.get("/leaderboard")
def get_data():
    data = get_leaderboard_data()
    return {"data": data}