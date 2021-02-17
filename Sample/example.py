import requests

def run_request():
    url = 'http://127.0.0.1:5000/predict'
    body = {
        "petal_length": 2,
        "sepal_length": 2,
        "petal_width": 0.5,
        "sepal_width": 3
    }
    response = requests.post(url, data=body)
    return response.json()