import requests


def test_trivia_api_call():
    url = "https://opentdb.com/api.php"
    params = {"amount": 10, "type": "multiple"}
    response = requests.get(url, params=params)
    # Assert the response status code is 200 (OK)
    assert response.status_code == 200

    # Assert the response contains JSON data
    assert response.headers.get("Content-Type").startswith("application/json")

    # Assert the response data contains the expected keys
    data = response.json()
    assert "results" in data
    assert isinstance(data["results"], list)

    # Assert the number of questions received is correct
    questions = data["results"]
    assert len(questions) == 10
