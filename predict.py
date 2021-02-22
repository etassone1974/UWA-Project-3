from flask_restful import Api, Resource, reqparse
import numpy as np
import joblib
# Load prebuilt model
CYCLONE_MODEL_SVM = joblib.load('../cyclone_svm.smd')

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

        # Use parser to create dictionary of data input
        args = parser.parse_args() 

        # Add calculated field of central_index to dictionary of data input
        args["central_index"] = pow((0.186*(pow(3.45*(1010 - (args["central_pres"])),0.644))),0.746)

        # Convert input data to array
        X_new = np.fromiter(args.values(), dtype=float) 
        # Generate prediction for a single value
        out = {'Prediction': CYCLONE_MODEL_SVM.predict([X_new])[0]}
        return out, 200