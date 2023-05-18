from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np
import sklearn
import sys
from sklearn.linear_model import LinearRegression
from sklearn.linear_model import LogisticRegression

arg1 = sys.argv[1]
to_predict = arg1

# feature which will be used to predict
arg2 = sys.argv[2]
if arg2 == "":
    with_predict = []
else:
    with_predict = arg2

arg3 = sys.argv[3]
iterations = arg3

path = sys.argv[4]
data = pd.read_csv(path)
df1 = pd.DataFrame(data)



cols = ['GENDER','AGE','SMOKING', 'YELLOW_FINGERS', 'ANXIETY','PEER_PRESSURE', 'CHRONIC DISEASE', 'FATIGUE ', 'ALLERGY ', 'WHEEZING','ALCOHOL CONSUMING', 'COUGHING', 'SHORTNESS OF BREATH','SWALLOWING DIFFICULTY', 'CHEST PAIN', 'LUNG_CANCER']
linearfeatures=['AGE']
logisticfeatures= ['GENDER', 'SMOKING', 'YELLOW_FINGERS', 'ANXIETY','PEER_PRESSURE', 'CHRONIC DISEASE', 'FATIGUE ', 'ALLERGY ', 'WHEEZING','ALCOHOL CONSUMING', 'COUGHING', 'SHORTNESS OF BREATH','SWALLOWING DIFFICULTY', 'CHEST PAIN', 'LUNG_CANCER']
dflinear=df1[linearfeatures]
dflogistic=df1[logisticfeatures]
classes=()


# epsilon = 5
# sensitivity = df1[linearfeatures].max().max() - df1[linearfeatures].min().min()

# Add noise to the data
# for col in linearfeatures:
#     noise = np.random.laplace(loc=0, scale=sensitivity/epsilon, size=len(df1))
#     df1[col] = df1[col] + noise


if with_predict == []:
    df2 = df1[cols]
else:
    df2 = df1[with_predict]


# Balancing the data 

train_set, test_set = train_test_split(df2, test_size=0.2, random_state=42)
length1 = len(train_set)


X_newTrain = train_set.drop(to_predict, axis='columns')
Y_newTrain = train_set[to_predict]
X_newTest = test_set.drop(to_predict, axis='columns')
Y_newTest = test_set[to_predict]




# predicting of first model
if (to_predict in logisticfeatures):
    model = LogisticRegression()
    model.fit(X_newTrain, Y_newTrain)
    classes = model.classes_
    # new addition
else:
    model = LinearRegression()
    model.fit(X_newTrain, Y_newTrain)

coef1 = model.coef_ * length1
X_zeros = np.zeros((1, X_newTest.shape[1]))
intercept1 = model.predict(X_zeros) * length1
iterations = int(iterations)-1

coef_str = ','.join(map(str, coef1))

# print(X_zeros)
print(coef_str)
print(intercept1)
print(model)
print(classes)
print(iterations)
print(length1)