import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# Load the CSV data into a DataFrame
df = pd.read_csv('sample_data.csv')

# Filter data for 'carryback' tag
carryback_data = df[df['tag_name'] == 'carryback']

# Filter data for a specific section_id, e.g., section_id = 1
section_id = 1
section_data = carryback_data[carryback_data['section_id'] == section_id]

# Extract the predictor (belt_rotation) and the target (area_sum)
X = section_data[['belt_rotation']]
y = section_data['area_sum']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create the linear regression model
model = LinearRegression()

# Train the model
model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f'Mean Squared Error: {mse}')
print(f'R-squared: {r2}')

# Define the threshold value for area_sum
threshold = 150000  # Example threshold value

# Create a range of belt_rotation values for prediction
belt_rotation_range = np.linspace(X['belt_rotation'].min(), X['belt_rotation'].max(), 100).reshape(-1, 1)

# Predict area_sum values for the range of belt_rotation values
predicted_area_sum = model.predict(belt_rotation_range)

# Find the belt_rotation value where predicted_area_sum exceeds the threshold
exceed_threshold_index = np.where(predicted_area_sum > threshold)[0]

if len(exceed_threshold_index) > 0:
    exceed_threshold_belt_rotation = belt_rotation_range[exceed_threshold_index[0]][0]
    print(f'The belt_rotation value at which area_sum exceeds the threshold of {threshold} is: {exceed_threshold_belt_rotation}')
else:
    print(f'The predicted area_sum does not exceed the threshold of {threshold} within the given range of belt_rotation values.')

# Plot the training data
plt.scatter(X_train, y_train, color='blue', label='Training data')

# Plot the test data
plt.scatter(X_test, y_test, color='green', label='Test data')

# Plot the regression line
plt.plot(belt_rotation_range, predicted_area_sum, color='red', linewidth=2, label='Regression line')

# Plot the threshold line
plt.axhline(y=threshold, color='orange', linestyle='--', label=f'Threshold = {threshold}')

# Plot the vertical line
if len(exceed_threshold_index) > 0:
    plt.axvline(x=exceed_threshold_belt_rotation, color='purple', linestyle='--', label=f'Exceed Threshold at Belt Rotation = {exceed_threshold_belt_rotation}')

plt.xlabel('Belt Rotation')
plt.ylabel('Area Sum')
plt.title(f'Linear Regression for Section ID {section_id}')
plt.legend()
plt.show()