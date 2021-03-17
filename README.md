# Cyclones In Australia Since 1990
## UWA Data Analytics Boot Camp Project 3

### Notes

* The deployment on Heroku is at https://et-cyclonesau.herokuapp.com/
* Predictions of wind direction are available through the Machine Learning page
* Predictions are also available through the following links:
  + https://et-cyclonesau.herokuapp.com/example
  + The example link uses the following parameters:
        "surface_code": 2,
        "cyc_type": 30,
        "lat": -12.54,
        "lon": 130.98,
        "central_pres" : 994,
        "max_wind_spd" : 20.6,
        "central_index" : 2.721183568,
        "wave_height" : 4.834374
  + The next link uses the following parameters:
        "surface_code": 1,
        "cyc_type": 20,
        "lat": -11,
        "lon": 92.6,
        "central_pres" : 1001,
        "max_wind_spd" : 12.9,
        "central_index" : 2.064004808,
        "wave_height" : 3.337484
  + https://et-cyclonesau.herokuapp.com/parameters/1&20&-11&92.6&1001&12.9&2.064004808&3.337484
  + Other values for the parameters can be substituted for other predictions linked by ampersands (&)
  + For example hhttps://et-cyclonesau.herokuapp.com/parameters/2&1&1&3&6&6&8&7
