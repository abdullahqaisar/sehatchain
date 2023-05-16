from sklearn.linear_model import LinearRegression
from sklearn.linear_model import LogisticRegression
import numpy as np
import sys

coefficients_str = sys.argv[1]
intercept = float(sys.argv[2])
spec = sys.argv[3]
# bring tha classes from other page
classes = sys.argv[4]
iterations = int(sys.argv[5])

# replace nan with 0 in classes
classes = classes.replace('NaN', '0')


if classes == '()':
    ensemble = LinearRegression()
else:
    ensemble = LogisticRegression()
    classes = classes.replace('[', '')
    classes = classes.replace(']', '')
    classes = classes.replace("'", '')
    classes = classes.split(',')
    classes = np.array(classes, dtype=int)
    ensemble.classes_ = classes

print(ensemble.classes_)
coef = np.array([coefficients_str.split(',')], dtype=float)
coef = coef.reshape(-1, 13)
ensemble.coef_ = coef

ensemble.intercept_ = [intercept]
if iterations < 1:
    # X_newTest = [30, 2.0, 112.0, 160.0, 0.0,
    #              0.0, 138.0, 0.0, 0.0, 0.0, 3.0, 0.0, 2.0]
    spec = np.array([spec.split(',')], dtype=float)
    X_newTest = spec
    X_newTest = np.array(X_newTest).reshape(1, -1)

    # y_pred = ensemble.predict([[30,2.0,1.0,112.0,160.0,0.0,0.0,138.0,0.0,2.0,0.0,3.0,0.0]])
    y_pred = ensemble.predict(X_newTest)
    print(y_pred)

else:
    print("model is not ready yet")
