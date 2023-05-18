from fastapi.testclient import TestClient
from unittest.mock import patch

from .api import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello world."}
    
def test_read_correct_answers():
    response = client.get("/correct-answers")
    assert response.status_code == 200
    
    
