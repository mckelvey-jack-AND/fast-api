from fastapi.testclient import TestClient

from .api import app

client = TestClient(app)


def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello world."}
    
# def test_leaderboard():
#     response = client.get("/leaderboard?type=individual")
#     assert response.status_code == 200
