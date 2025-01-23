import os
import csv
import requests
import sqlite3
from PIL import Image
from pathlib import Path
from datetime import datetime

# Prediction API settings
endpoint = "https://australiaeast.api.cognitive.microsoft.com/"
prediction_key = "130zGy04dbVLoSP94SIZlbb6i59Q0qpdvk5g1AVFjtqRDkCjW3CxJQQJ99BAACL93NaXJ3w3AAAIACOGXcDJ"
project_id = "a3deae39-d72a-4cab-abff-90e2d7a225ec"
iteration_name = "Iteration1"
prediction_url = f"{endpoint}/customvision/v3.0/Prediction/{project_id}/detect/iterations/{iteration_name}/image"
headers = {
    'Prediction-Key': prediction_key,
    'Content-Type': 'application/octet-stream',
}

# Function to process images in folders
def process_images_with_model(root_folder, output_csv, threshold=0.5):
    # Ensure the root folder exists
    if not os.path.exists(root_folder):
        raise FileNotFoundError(f"Root folder '{root_folder}' does not exist.")

    # Prepare the CSV file
    with open(output_csv, mode='w', newline='') as csv_file:
        fieldnames = ['section_id', 'belt_rotation', 'timestamp', 'tag_name', 'probability', 
                      'Bounding Box', 'width', 'height', 'image_path', 'area', 'area_sum']
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
        writer.writeheader()

        # Process each section folder
        for section_folder in sorted(os.listdir(root_folder)):
            section_path = os.path.join(root_folder, section_folder)

            if os.path.isdir(section_path) and section_folder.startswith("Section"):
                section_id = int(section_folder.replace("Section", ""))
                images = sorted(Path(section_path).glob("*.png"))  # Adjust extension if needed
                belt_rotation = 1
                areas_by_rotation = {}

                for i, image_path in enumerate(images):
                    # Determine the belt rotation
                    belt_rotation = (i // 3) + 1

                    # Read image data and send to the prediction API
                    with open(image_path, 'rb') as image_file:
                        image_data = image_file.read()
                    response = requests.post(prediction_url, headers=headers, data=image_data)

                    # Handle API response
                    if response.status_code != 200:
                        print(f"Error with {image_path}: {response.status_code} - {response.text}")
                        continue
                    analysis = response.json()

                    # Filter predictions above the threshold
                    filtered_predictions = [p for p in analysis.get('predictions', []) if p['probability'] > threshold]

                    for prediction in filtered_predictions:
                        timestamp = datetime.now().isoformat()
                        tag = prediction['tagName']
                        probability = prediction['probability']
                        bounding_box = prediction['boundingBox']

                        # Get bounding box dimensions
                        left = bounding_box['left']
                        top = bounding_box['top']
                        width = bounding_box['width']
                        height = bounding_box['height']

                        # Calculate dimensions and area in pixels
                        with Image.open(image_path) as img:
                            image_width, image_height = img.size
                        abs_width = width * image_width
                        abs_height = height * image_height
                        area = abs_width * abs_height

                        # Update area sums
                        rotation_key = (section_id, belt_rotation)
                        areas_by_rotation[rotation_key] = areas_by_rotation.get(rotation_key, 0) + area

                        # Write data to the CSV
                        writer.writerow({
                            'section_id': section_id,
                            'belt_rotation': belt_rotation,
                            'timestamp': timestamp,
                            'tag_name': tag,
                            'probability': probability,
                            'Bounding Box': f"left={left}, top={top}, width={width}, height={height}",
                            'width': abs_width,
                            'height': abs_height,
                            'image_path': image_path.name,
                            'area': area,
                            'area_sum': areas_by_rotation[rotation_key],
                        })

# Example usage
if __name__ == "__main__":
    root_folder = "./CarrybackImages"  # Path to the root folder containing Section1, Section2, etc.
    output_csv = "predictions_output.csv"  # Path to the output CSV file

    try:
        process_images_with_model(root_folder, output_csv, threshold=0.5)
        print(f"CSV file '{output_csv}' created successfully.")
    except Exception as e:
        print(f"An error occurred: {e}")