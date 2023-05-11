from sklearn.linear_model import LinearRegression
from sklearn.linear_model import LogisticRegression
import numpy as np
import sys
num_hospitals = (len(sys.argv) - 1) // 3

coefficients = []
intercepts = []
lengths = []
classes = ()

for i in range(num_hospitals):
    coefficients_str = sys.argv[i*3 + 1]
    coefficients.append(np.array(coefficients_str.split(','), dtype=float))
    intercepts.append(float(sys.argv[i*3 + 2]))
    lengths.append(float(sys.argv[i*3 + 3]))

combined_coef = sum(coefficients) / sum(lengths)
combined_intercept = sum(intercepts) / sum(lengths)

coef_str = ','.join(map(str, combined_coef))

print(coef_str)
print(combined_intercept)
print(classes)

