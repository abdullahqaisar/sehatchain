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
print("arg1:", arg1)
to_predict = arg1
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


if(to_predict in linearfeatures):
    logreg = LogisticRegression()
    logreg.fit(X_newTrain, Y_newTrain)

    # Extract the model parameters as a dictionary
    model_params = logreg.get_params()
    print(model_params)
else :
    regr = LinearRegression()
    regr.fit(X_newTrain, Y_newTrain)
    # Extract the model parameters as a dictionary
    model_params = regr.get_params()
    #Print the model parameters
    print(model_params)
