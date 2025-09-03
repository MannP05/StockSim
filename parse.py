# parsing end of day data from the txt files. 
# NASDAQ Stock Exchange EOD data provided by eoddata.com/download.aspx?e=NASDAQ

# txt format: MetaStock ASCII (8 columns))

def parse_eod_data(file_path) -> None:
    with open(file_path) as f:
        print(f.read())

# parse_eod_data("data/NASDAQ_20250902.txt")

# name, ticker, date, open, high, low, close, volume = []