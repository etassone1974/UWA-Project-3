from flask_restful import Api, Resource, reqparse
import numpy as np
import joblib
# Load prebuilt model
CYCLONE_MODEL_SVM = joblib.load('training/cyclone_SVM.smd')
CYCLONE_MODEL_KNN = joblib.load('training/cyclone_KNN.smd')
CYCLONE_MODEL_RF = joblib.load('training/cyclone_RF.smd')

# Create predict method
class Predict(Resource):
    @staticmethod
    def post():
        parser = reqparse.RequestParser()
        parser.add_argument('surface_code')
        parser.add_argument('cyc_type')
        parser.add_argument('lat')
        parser.add_argument('lon')
        parser.add_argument('central_pres')
        parser.add_argument('max_wind_spd')
        parser.add_argument('central_index')
        parser.add_argument('wave_height')
        # Use parser to create dictionary of data input
        args = parser.parse_args() 
        # Convert input data to array
        X_new = np.fromiter(args.values(), dtype=float) 
        # Generate prediction for a single value
        print("Old X_new =  ", X_new)
        # X_new = [2,1,1,3,6,6,8]
        print("New X_new = ", X_new)
        out = {'Prediction (SVM)': CYCLONE_MODEL_SVM.predict([X_new])[0], 'Prediction (kNN)': CYCLONE_MODEL_KNN.predict([X_new])[0], 'Prediction (Random Forest)': CYCLONE_MODEL_RF.predict([X_new])[0]}
        return out, 200