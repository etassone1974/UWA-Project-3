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

# create route that renders html pages
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/plots")
def plots():
    return render_template("plots.html")

@app.route("/api")
def api():
    return render_template("api.html")

@app.route("/ml")
def ml():
    return render_template("ml.html")

@app.route("/aboutus")
def aboutus():
    return render_template("aboutus.html")

# Example prediction
@app.route('/example')
def run_example():
    res = run_request()
    return res

@app.route('/parameters/<surface_code>&<cyc_type>&<lat>&<lon>&<central_pres>&<max_wind_spd>&<central_index>')
def get_prediction(surface_code=1, cyc_type=20, lat=-11, lon=92.6, central_pres=1001, max_wind_spd=12.9, central_index=2.064004808):
    # url = 'http://127.0.0.1/predict'
    url = 'https://et-cyclonesau.herokuapp.com/predict'
    body = {
        "surface_code": surface_code,
        "cyc_type": cyc_type,
        "lat": lat,
        "lon": lon,
        "central_pres" : central_pres,
        "max_wind_spd" : max_wind_spd,
        "central_index" : central_index
    }
    response = requests.post(url, data=body)
    return response.json()

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

if __name__ == '__main__':
    app.run(debug=True, port='80')
