from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import accuracy_score
import joblib
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
  
    
def train(X,y):

    # train test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

    # Scale the X data
    X_scaler = StandardScaler().fit(X_train)
    X_train_scaled = X_scaler.transform(X_train)
    X_test_scaled = X_scaler.transform(X_test)

    # Support vector machine linear classifier
    model = SVC(kernel='linear')

    # Fit the model to the training data and calculate the scores for the training and testing data
    model.fit(X_train_scaled, y_train)

    training_score = model.score(X_train_scaled, y_train)
    testing_score = model.score(X_test_scaled, y_test)
    
    print(f"Training Data Score: {training_score}")
    print(f"Testing Data Score: {testing_score}")
    
    preds = model.predict(X_test_scaled)
    acc = accuracy_score(y_test, preds)
    print(f'Model accuracy on test set: {acc:.2f}')
    return model

if __name__ == '__main__':
   
    # Read data into DataFrame from CSV file
    cyclone_df = pd.read_csv("data/Cyclone_ML.csv")

    # Select features for machine learning and assign to X
    selected_features = cyclone_df[["SURFACE_CODE",	"CYC_TYPE", "LAT", "LON", "CENTRAL_PRES", "MAX_WIND_SPD", "CENTRAL_INDEX (CI)"]]
    X = selected_features

    # Set y to compass direction of cyclone based on wind direction degree
    y = cyclone_df["WIND_COMPASS"]
    print(X.shape, y.shape)

    svm_model = train(X,y)

    # serialize model
    joblib.dump(svc_model, 'cyclone_SVM.smd')
    print("Model is saved.")