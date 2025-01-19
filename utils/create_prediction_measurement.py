import os
import glob
import pandas as pd

# Load asset data (pipe-delimited)
asset_df = pd.read_csv('../data/asset.csv', delimiter='|')

# Load measurement_type data (pipe-delimited)
mt_df = pd.read_csv('../data/measurement_type.csv', delimiter='|')

# Map columns in spaces_prediction_data to measurement_type.id
col_to_mt = {
  'predicted_elec_kwh': 1,
  'predicted_htwt_mmbtuh': 3,
  'predicted_chll_tonh': 5,
  'predicted_co2_tonh': 2
}

# Prepare output
out_cols = ['asset_id','measurement_type_id','measurement_prediction_type_id','ts','value']
final_rows = []

# Iterate over each spaces_prediction_data CSV file
for file_path in glob.glob('./2_spaces_prediction_data/*.csv'):
  filename = os.path.basename(file_path)
  asset_name = os.path.splitext(filename)[0].replace('_Data_Extended_spaces_hour', '').replace('_', ' ')
  print(asset_name)

  # Find asset_id from asset.name
  row_asset = asset_df.loc[asset_df['name'] == asset_name]
  if row_asset.empty:
    # If not found, skip or handle error
    print(f'*** Asset Not Found: {asset_name} ***')
    continue
  asset_id = row_asset['id'].iloc[0]

  # Read CSV (comma-delimited)
  df = pd.read_csv(file_path)

  # For each row, create multiple measurement rows from predicted columns
  for _, row in df.iterrows():
    ts = row['ts']
    for col in col_to_mt:
      if col in df.columns:
        value = row[col]
        # We'll assume measurement_prediction_type_id=2 for these predictions
        mtype_id = col_to_mt[col]
        final_rows.append([asset_id,mtype_id,2,ts,value])

# Create final DataFrame
final_df = pd.DataFrame(final_rows, columns=out_cols)

final_df = final_df[final_df['value'].notna()]

# Sort by asset_id, then by ts
final_df.sort_values(by=out_cols, inplace=True)

# Write to pipe-delimited CSV
final_df.to_csv('../data/xgboost_prediction_measurement.csv', sep='|', index=False)
