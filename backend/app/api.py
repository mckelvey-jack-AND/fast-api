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

@app.get("/", tags=["root"])
async def read_root() -> dict:
    
    return {"message": "Hello world."}

@app.get("/leaderboard")
def get_data():
    data = get_leaderboard_data()
    return {"data": data}