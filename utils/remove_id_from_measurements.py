import pandas as pd

df = pd.read_csv('../data/measurement.csv', sep='|')

df = df.drop(columns=['id'])

df.to_csv('../data/measurement.csv', index=False, sep='|')