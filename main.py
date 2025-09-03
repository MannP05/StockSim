# parsing End of Day data from the txt files. 
# NASDAQ Stock Exchange EOD data provided by eoddata.com/download.aspx?e=NASDAQ

# format: MetaStock ASCII (8 columns))

name, ticker, date, open, high, low, close, volume = []

def parse_eod_data(file_path):
    with open(file_path) as f:
        print(f.read())

parse_eod_data("data/NASDAQ_20250902.txt")