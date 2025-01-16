import csv
import random
import argparse
from datetime import datetime, timedelta

# Argument parser
parser = argparse.ArgumentParser(description='Generate sample data for bounding boxes.')
parser.add_argument('num_records', type=int, help='Number of records to generate')
parser.add_argument('output_file', type=str, help='Output CSV file path')
args = parser.parse_args()

# Constants
NUM_SECTIONS = 10
TAG_NAME = 'carryback'
IMAGE_PATH_TEMPLATE = 'https://example.com/image_{}.jpg'
AREA_SCALER_MIN = 1000
AREA_SCALER_MAX = 10000
MAX_AREA_SUM_LIMIT = 200000  # Maximum area sum limit for all sections
SPECIFIC_MAX_AREA_SUM_LIMIT = 10000  # Target area sum limit for specific sections
SPECIFIC_SECTIONS = [4, 7, 9]  # Sections to control the rate of increase

# Function to generate random data
def generate_random_data(num_records):
    data = []
    current_timestamp = datetime.now()
    
    box_id = 1
    section_id = 1
    belt_rotation = 1
    cumulative_area_sums = {section: 0 for section in range(1, NUM_SECTIONS + 1)}
    boxes_per_section = {section: random.randint(1, 10) for section in range(1, NUM_SECTIONS + 1)}
    max_area_sums = []
    
    while box_id <= num_records:
        for section_id in range(1, NUM_SECTIONS + 1):
            boxes_in_section = boxes_per_section[section_id]
            current_area_sum = cumulative_area_sums[section_id]  # Start with the cumulative area sum
            
            for _ in range(boxes_in_section):
                if box_id > num_records:
                    break
                
                timestamp = current_timestamp + timedelta(seconds=box_id)  # Progressive timestamp
                tag_name = TAG_NAME
                probability = random.uniform(0, 1)
                left = random.uniform(0, 1)
                top = random.uniform(0, 1)
                width = random.uniform(0.1, 0.5)  # Assuming width is between 10% and 50% of the image width
                height = random.uniform(0.1, 0.5)  # Assuming height is between 10% and 50% of the image height
                image_path = IMAGE_PATH_TEMPLATE.format(box_id)
                area_scaler = random.uniform(AREA_SCALER_MIN, AREA_SCALER_MAX)
                # Apply a scaling factor that increases with each belt rotation
                progressive_scaler = 1 + (belt_rotation - 1) * 0.1
                area = area_scaler * width * height * progressive_scaler
                
                # Apply a slower growth rate for specific sections
                if section_id in SPECIFIC_SECTIONS:
                    area *= 0.1  # Reduce the area by a factor of 10 for slower growth
                
                current_area_sum += area
                
                data.append({
                    'box_id': box_id,
                    'section_id': section_id,
                    'belt_rotation': belt_rotation,
                    'timestamp': timestamp.isoformat(),
                    'tag_name': tag_name,
                    'probability': probability,
                    'left': left,
                    'top': top,
                    'width': width,
                    'height': height,
                    'image_path': image_path,
                    'area': area,
                    'area_sum': 0  # Placeholder, will be updated later
                })
                
                box_id += 1
            
            cumulative_area_sums[section_id] = current_area_sum  # Update the cumulative area sum
            max_area_sums.append({
                'section_id': section_id,
                'belt_rotation': belt_rotation,
                'area_sum': current_area_sum
            })
        
        belt_rotation += 1  # Increment belt_rotation for the next set of sections
    
    # Update area_sum for each row
    for row in data:
        for max_area_sum in max_area_sums:
            if row['section_id'] == max_area_sum['section_id'] and row['belt_rotation'] == max_area_sum['belt_rotation']:
                row['area_sum'] = max_area_sum['area_sum']
                break
    
    return data

# Function to write data to CSV
def write_to_csv(data, output_file):
    fieldnames = ['box_id', 'section_id', 'belt_rotation', 'timestamp', 'tag_name', 'probability', 'left', 'top', 'width', 'height', 'image_path', 'area', 'area_sum']
    
    with open(output_file, mode='w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)

# Main function
def main():
    num_records = args.num_records
    output_file = args.output_file
    
    data = generate_random_data(num_records)
    write_to_csv(data, output_file)
    print(f'Successfully generated {num_records} records and saved to {output_file}')

if __name__ == '__main__':
    main()