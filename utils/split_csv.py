import csv
import os
import sys

def split_csv(path, rows_per_chunk=30000):
  base = os.path.splitext(os.path.basename(path))[0]
  with open(path, newline='') as src:
    reader = csv.reader(src)
    header = next(reader, None)
    count = 0
    part = 1
    out = None
    writer = None
    for row in reader:
      if count % rows_per_chunk == 0:
        if out:
          out.close()
        filename = f'{base}_part{part}.csv'
        out = open(filename, 'w', newline='')
        writer = csv.writer(out)
        if header:
          writer.writerow(header)
        part += 1
      writer.writerow(row)
      count += 1
    if out:
      out.close()

if __name__ == '__main__':
  if len(sys.argv) < 2:
    print('Usage: python split_csv.py path/to/file.csv [rows_per_chunk]')
    sys.exit(1)
  split_csv(sys.argv[1], int(sys.argv[2]) if len(sys.argv) > 2 else 30000)
