import pandas as pd

# Load the CSV file
file_path = '../data/pa_measurement.csv'
data = pd.read_csv(file_path)

# Drop duplicates based on the subset of columns and keep the first occurrence
subset_columns = ['asset_id', 'measurement_type_id', 'ts']
data_cleaned = data.drop_duplicates(subset=subset_columns, keep='first')

# Save the cleaned data back to a new file
output_path = '../data/pa_measurement.csv'
data_cleaned.to_csv(output_path, index=False)
