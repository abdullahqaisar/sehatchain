from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np
import sklearn
import sys
from sklearn.linear_model import LinearRegression
from sklearn.linear_model import LogisticRegression

arg1 = sys.argv[1]
to_predict = arg1
with_predict=[]

## feature which will be used to predict
arg2 = sys.argv[2]
#with_predict=[]
with_predict = arg2

arg3 = sys.argv[3]
iterations = arg3

arg4 = sys.argv[4]
coef_global = arg4

arg5 = sys.argv[5]
intercept_global = arg5

arg6 = sys.argv[6]
classes_global = arg6

#add data
data = pd.read_csv('src\script\clevelandfinal.csv')

df1 = pd.DataFrame(data)

cols = ['GENDER','AGE','SMOKING', 'YELLOW_FINGERS', 'ANXIETY','PEER_PRESSURE', 'CHRONIC DISEASE', 'FATIGUE ', 'ALLERGY ', 'WHEEZING','ALCOHOL CONSUMING', 'COUGHING', 'SHORTNESS OF BREATH','SWALLOWING DIFFICULTY', 'CHEST PAIN', 'LUNG_CANCER']
linearfeatures=['AGE']
logisticfeatures= ['GENDER', 'SMOKING', 'YELLOW_FINGERS', 'ANXIETY','PEER_PRESSURE', 'CHRONIC DISEASE', 'FATIGUE ', 'ALLERGY ', 'WHEEZING','ALCOHOL CONSUMING', 'COUGHING', 'SHORTNESS OF BREATH','SWALLOWING DIFFICULTY', 'CHEST PAIN', 'LUNG_CANCER']
dflinear=df1[linearfeatures]
dflogistic=df1[logisticfeatures]
classes=()


# Define the privacy budget and sensitivity of the data
epsilon = 5 + 0.5
sensitivity = df1[linearfeatures].max().max() - df1[linearfeatures].min().min()


if with_predict == []:
    df2 = df1[cols]
else:
    df2 = df1[with_predict]

# trainTestSPlit:
train_set, test_set = train_test_split(df2, test_size=0.2, random_state=42)
length1 = len(train_set)


X_newTrain = train_set.drop(to_predict, axis='columns')
Y_newTrain = train_set[to_predict]
X_newTest = test_set.drop(to_predict, axis='columns')
Y_newTest = test_set[to_predict]


# predicting of first model
if (to_predict in logisticfeatures):
    model = LogisticRegression()
    model.classes_ = classes_global #new addition
else:
    model = LinearRegression()
    
model.coef_ = coef_global
model.intercept_ = intercept_global
model.fit(X_newTrain, Y_newTrain)

coef1 = model.coef_ * length1
X_zeros = np.zeros((1, X_newTest.shape[1]))
intercept1 = model.predict(X_zeros) * length1

coef_str = ','.join(map(str, coef1))

# print(X_zeros)
print(coef_str)
print(intercept1)
print(length1)
print(model)
print(classes)
print(iterations)

