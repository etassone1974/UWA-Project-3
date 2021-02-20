from flask import Flask
import numpy as np
from flask_restful import Api
from predict import Predict
import requests
from example import run_request
from models import create_classes
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
import pandas as pd

# Create APP
app = Flask(__name__)
API = Api(app)

# Load database
# From prepared CSV files
# Separate files for machine learning and other data due to data source limitations
cyclone_data = pd.read_csv("Cyclone_1990_clean.csv")
cyclone_ml_data = pd.read_csv("Cyclone_ML.csv")

# from flask_sqlalchemy import SQLAlchemy
# app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db.sqlite" #os.environ.get('DATABASE_URL', '') or 

# Remove tracking modifications
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)

# Pet = create_classes(db)

# Flask Routes

# Add predict to route predict
# API.add_resource(Predict, '/predict')

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

# @app.route("/viz1")
# def viz1():
#     return render_template('viz1.html')

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
    response = requests.post(url, data=body)
    return response.json()

# @app.route('/create/<first_name>&<last_name>')
# def create(first_name=None, last_name=None):
#   return 'Hello ' + first_name + ',' + last_name


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