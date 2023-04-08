from sklearn.linear_model import LinearRegression
import numpy as np
import sys
num_hospitals = (len(sys.argv) - 1) // 3

coefficients = []
intercepts = []
lengths = []

for i in range(num_hospitals):
    coefficients_str = sys.argv[i*3 + 1]
    coefficients.append(np.array(coefficients_str.split(','), dtype=float))
    intercepts.append(float(sys.argv[i*3 + 2]))
    lengths.append(float(sys.argv[i*3 + 3]))

combined_coef = sum(coefficients) / sum(lengths)
combined_intercept = sum(intercepts) / sum(lengths)

ensemble = LinearRegression()
ensemble.coef_ = np.array([combined_coef])
ensemble.intercept_ = combined_intercept

print(ensemble)
print(ensemble.coef_)
print(ensemble.intercept_)

X_newTest = [0.0, 2.0, 112.0, 160.0, 0.0,
             0.0, 138.0, 0.0, 0.0, 2.0, 0.0, 3.0, 0.0]
X_newTest = np.array(X_newTest).reshape(1, -1)

y_pred = ensemble.predict(X_newTest)
print(y_pred)
