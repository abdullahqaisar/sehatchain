from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np
import sklearn
import sys
from sklearn.linear_model import LinearRegression
from sklearn.linear_model import LogisticRegression

arg1 = sys.argv[1]
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
length1 = len(train_set)


X_newTrain = train_set.drop(to_predict, axis='columns')
Y_newTrain = train_set[to_predict]
X_newTest = test_set.drop(to_predict, axis='columns')
Y_newTest = test_set[to_predict]


# predicting of first model
if (to_predict in logisticfeatures):
    model = LogisticRegression()
else:
    model = LinearRegression()

model.fit(X_newTrain, Y_newTrain)

coef1 = model.coef_ * length1
X_zeros = np.zeros((1, X_newTest.shape[1]))
intercept1 = model.predict(X_zeros) * length1


coef_str = ','.join(map(str, coef1))

print(coef_str)
print(intercept1)
print(length1)
