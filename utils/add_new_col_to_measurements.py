import pandas as pd
import numpy as np

f= 'measurement.csv'

df = pd.read_csv(f'../data/{f}', sep='|')

df['measurement_prediction_type_id'] = 0

df = df[['asset_id', 'measurement_type_id', 'measurement_prediction_type_id', 'ts', 'value']]

df.to_csv(f'../data/{f}', index=False, sep='|')