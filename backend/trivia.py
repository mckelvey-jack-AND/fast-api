import requests
import json

# Make an API request to get 10 questions from trivia api
response = requests.get('https://opentdb.com/api.php?amount=10')
data = json.loads(response.text)
print(data)
