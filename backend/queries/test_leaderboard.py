from fastapi import FastAPI
from fastapi.testclient import TestClient
from backend.main import app

# app = FastAPI()


# @app.get("/leaderboard")
# async def read_main():
#     return {"data":[{"squad":"squad_1","total score":124},{"squad":"squad_3","total score":121},{"squad":"squad_2","total score":103}]}


client = TestClient(app)

def test_leaderboard():
    response = client.get("/leaderboard")
    assert response.status_code == 200