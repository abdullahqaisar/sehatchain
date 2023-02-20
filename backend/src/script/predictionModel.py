# imports
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np
import gradio as gr
import seaborn as sns
import matplotlib.pyplot as plt
import sklearn
from sklearn.linear_model import LinearRegression
from sklearn.linear_model import LogisticRegression

import sys

arg1 = sys.argv[1]
arg2 = sys.argv[2]
print("arg1:", arg2)
to_predict = 'age'
data = pd.read_csv('src\script\clevelandfinal.csv')
df1 = pd.DataFrame(data)


# cols=['age','gender','chest_pain_type','resting_BP','serum_cholestoral','fasting_BP','resting_electrocardiographic','maximum_heartRate','exercise_induced_angina','oldpeak','slope_peak_ex','no_of_major_vessels','thal','num']
linearfeatures = ['age', 'resting_BP',
                  'serum_cholestoral', 'maximum_heartRate', 'oldpeak']
logisticfeatures = ['gender', 'chest_pain_type', 'fasting_BP', 'resting_electrocardiographic',
                    'exercise_induced_angina', 'slope_peak_ex', 'no_of_major_vessels', 'thal', 'num']
dflinear = df1[linearfeatures]
dflogistic = df1[logisticfeatures]


# trainTestSPlit:
train_set, test_set = train_test_split(df1, test_size=0.2, random_state=42)

X_newTrain = train_set.drop(to_predict, axis='columns')
Y_newTrain = train_set[to_predict]
X_newTest = test_set.drop(to_predict, axis='columns')
Y_newTest = test_set[to_predict]


if (to_predict in linearfeatures):
    regr = LinearRegression()
    regr.fit(X_newTrain, Y_newTrain)
    print(
        f"Liner regression score of predict attribute {to_predict} is {regr.score(X_newTest, Y_newTest)}")
    prediction = regr.predict(X_newTest)
    print("Prediction:", prediction)
else:
    regressor = DecisionTreeRegressor()
    regressor.fit(X_newTrain, Y_newTrain)
    Y_pred = regressor.predict(X_newTest)
    r2_score(Y_newTest, Y_pred)
    print("Prediction:", Y_pred)
