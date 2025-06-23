import os
import sys

def print_copy_commands(directory, prefix='data/measurement'):
  for fname in sorted(os.listdir(directory)):
    fpath = os.path.join(directory, fname)
    if os.path.isfile(fpath):
      rel = f"{prefix}/{fname}"
      print(f"\\copy public.measurement (asset_id, measurement_type_id, measurement_prediction_type_id, ts, value) FROM '{rel}' DELIMITER '|' CSV HEADER NULL AS '';")

if __name__ == '__main__':
  if len(sys.argv) < 2:
    print('Usage: python make_copy_cmds.py <directory> [prefix]')
    sys.exit(1)
  print_copy_commands(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else 'data/measurement')
