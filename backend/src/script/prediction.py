from sklearn.linear_model import LinearRegression
import numpy as np
import sys

coefficients_str = sys.argv[1]
intercept = float(sys.argv[2])

ensemble = LinearRegression()
ensemble.coef_ = np.array([coefficients_str.split(',')], dtype=float)
ensemble.intercept_ = [intercept]

X_newTest = [0.0, 2.0, 112.0, 160.0, 0.0,
             0.0, 138.0, 0.0, 0.0, 2.0, 0.0, 3.0, 0.0]
X_newTest = np.array(X_newTest).reshape(1, -1)

y_pred = ensemble.predict(X_newTest)
print(y_pred[0][0])
