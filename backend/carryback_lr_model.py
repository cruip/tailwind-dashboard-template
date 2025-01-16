import pandas as pd
import numpy as np
import json
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# Load the CSV data into a DataFrame
df = pd.read_csv('sample_data.csv')

# Filter data for 'carryback' tag
carryback_data = df[df['tag_name'] == 'carryback']

def process_section_data(section_id, output_file='graph_data.json'):
    # Filter data for the specified section_id
    section_data = carryback_data[carryback_data['section_id'] == section_id]

    if section_data.empty:
        print(f"No data found for section_id {section_id}.")
        return

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

    print(f'Section ID: {section_id}')
    print(f'Mean Squared Error: {mse:.2f}')
    print(f'R-squared: {r2:.2f}')

    # Define the threshold value for area_sum
    threshold = 50000  # Example threshold value

    # Extend the range of belt_rotation values
    min_belt_rotation = X['belt_rotation'].min()
    max_belt_rotation = X['belt_rotation'].max()
    extended_belt_rotation_range = np.linspace(min_belt_rotation, max_belt_rotation * 1.5, 200).reshape(-1, 1)

    # Predict area_sum values for the extended range
    predicted_area_sum = model.predict(extended_belt_rotation_range)
    predicted_area_sum = np.clip(predicted_area_sum, 0, None)

    # Find the belt_rotation value where predicted_area_sum exceeds the threshold
    exceed_threshold_index = np.where(predicted_area_sum > threshold)[0]

    exceed_threshold_belt_rotation = None
    corresponding_area_sum = None
    if len(exceed_threshold_index) > 0:
        exceed_threshold_belt_rotation = extended_belt_rotation_range[exceed_threshold_index[0]][0]
        corresponding_area_sum = predicted_area_sum[exceed_threshold_index[0]]
        print(f'The belt_rotation value at which area_sum exceeds the threshold of {threshold} is: {exceed_threshold_belt_rotation:.2f}')
        print(f'The corresponding area_sum at this belt_rotation is: {corresponding_area_sum:.2f}')
    else:
        print(f'The predicted area_sum does not exceed the threshold of {threshold} within the extended range.')

    # Round data to 2 significant figures
    graph_data = {
        'section_id': section_id,
        'mean_squared_error': round(mse, 2),
        'r2_score': round(r2, 2),
        'threshold': round(threshold, 2),
        'belt_rotation': [round(value, 2) for value in extended_belt_rotation_range.flatten()],
        'predicted_area_sum': [round(value, 2) for value in predicted_area_sum],
        'exceed_threshold_belt_rotation': round(exceed_threshold_belt_rotation, 2) if exceed_threshold_belt_rotation else None,
        'corresponding_area_sum': round(corresponding_area_sum, 2) if corresponding_area_sum else None,
    }

    # Save the processed data to a JSON file
    with open(output_file, 'w') as json_file:
        json.dump(graph_data, json_file)

    print(f"Processed data for section {section_id} saved to {output_file}.")

# Prompt user to select a section
while True:
    try:
        section_id = int(input("Enter a section ID (1-10) or 0 to exit: "))
        if section_id == 0:
            print("Exiting.")
            break
        elif section_id not in range(1, 11):
            print("Invalid section ID. Please enter a value between 1 and 10.")
        else:
            process_section_data(section_id)
    except ValueError:
        print("Invalid input. Please enter a numeric value.")
