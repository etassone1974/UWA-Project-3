from flask_restful import Api
from predict import Predict
from example import run_request
from flask import Flask, render_template, jsonify, request, redirect
import numpy as np
import pandas as pd
import requests
import os
import joblib
import json

# Create APP
app = Flask(__name__)
API = Api(app)

# Load database
# From prepared CSV files
# Separate files for machine learning and other data due to data source limitations
cyclone_data = pd.read_csv("data/Cyclone_1990_clean.csv")
cyclone_ml_data = pd.read_csv("data/Cyclone_ML.csv")

# Flask Routes

# Add predict to route predict
API.add_resource(Predict, '/predict')

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

# Example prediction
@app.route('/example')
def run_example():
    res = run_request()
    return res

@app.route('/parameters/<surface_code>&<cyc_type>&<lat>&<lon>&<central_pres>&<max_wind_spd>')
def get_prediction(surface_code=1, cyc_type=20, lat=-11, lon=92.6, central_pres=1001, max_wind_spd=12.9):
    url = 'http://127.0.0.1:5000/predict'
    body = {
        "surface_code": surface_code,
        "cyc_type": cyc_type,
        "lat": lat,
        "lon": lon,
        "central_pres" : central_pres,
        "max_wind_spd" : max_wind_spd
    }

    # Calculate central_index and add to dictionary
    body["central_index"] = pow((0.186*(pow(3.45*(1010 - (body["central_pres"])),0.644))),0.746)

    response = requests.post(url, data=body)
    return response.json()

@app.route('/api')
def api():
    return render_template('api.html') 

@app.route('/api/cyclones')
def cyclones():
    cyclone_json = cyclone_data.to_json(orient="records")
    cyclone_json_parsed = json.loads(cyclone_json)
    cyclone_json_string = json.dumps(cyclone_json_parsed, indent=4)  
    return cyclone_json_string

@app.route('/api/mldata')
def mldata():
    ml_json = cyclone_ml_data.to_json(orient="records")
    ml_json_parsed = json.loads(ml_json)
    ml_json_string = json.dumps(ml_json_parsed, indent=4)  
    return ml_json_string


# # Query the database and send the jsonified results
# @app.route("/send", methods=["GET", "POST"])
# def send():
#     if request.method == "POST":
#         name = request.form["petName"]
#         lat = request.form["petLat"]
#         lon = request.form["petLon"]

#         pet = Pet(name=name, lat=lat, lon=lon)
#         db.session.add(pet)
#         db.session.commit()
#         return redirect("/", code=302)

#     return render_template("form.html")


# @app.route("/api/pals")
# def pals():
#     results = db.session.query(Pet.name, Pet.lat, Pet.lon).all()

#     hover_text = [result[0] for result in results]
#     lat = [result[1] for result in results]
#     lon = [result[2] for result in results]

#     pet_data = [{
#         "type": "scattergeo",
#         "locationmode": "USA-states",
#         "lat": lat,
#         "lon": lon,
#         "text": hover_text,
#         "hoverinfo": "text",
#         "marker": {
#             "size": 50,
#             "line": {
#                 "color": "rgb(8,8,8)",
#                 "width": 1
#             },
#         }
#     }]

#     return jsonify(pet_data)

if __name__ == '__main__':
    app.run(debug=True, port='80')