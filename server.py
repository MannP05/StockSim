# parsing end of day data from the txt files. 
# NASDAQ Stock Exchange EOD data provided by eoddata.com/download.aspx?e=NASDAQ

# txt format: MetaStock ASCII (8 columns))
# https://www.youtube.com/watch?v=Hncp0mPfUvk - python web server tutorial

import socket

def parse_eod_data(file_path) -> None:
    with open(file_path) as f:
        print(f.read())

name, ticker, date, open, high, low, close, volume = []

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM) # IPv4 TCP socket object
server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1) # allows server socket to reuse address

server_socket.bind(('0.0.0.0', 8080))

server_socket.listen()
parse_eod_data("data/NASDAQ_20250902.txt")



