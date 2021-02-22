import requests

def run_request():
    url = 'http://127.0.0.1:5000/predict'
    body = {
        "surface_code": 2,
        "cyc_type": 30,
        "lat": -12.54,
        "lon": 130.98,
        "central_pres" : 994,
        "max_wind_spd" : 20.6,
        "central_index" : 2.721183568
    }
    response = requests.post(url, data=body)
    return response.json()