import pandas as pd
import numpy as np

f = 'pa_measurement.csv'

df = pd.read_csv(f'../data/{f}', sep=',')

df = df[['asset_id', 'measurement_type_id', 'ts', 'value']]

df.to_csv(f'../data/{f}', index=False, sep=',')