import requests

#sets api key from file 
API_KEY = open("API_KEY.txt").read().strip()
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
response = requests.get(f"https://api.eoddata.com/Quote/List/NASDAQ?ApiKey={API_KEY}", headers=headers)
response.raise_for_status()
#print(response.text)

with open("data/NASDAQ_list.txt", "w") as f: #write list of all nasdaq stocks to file
    f.write(response.text)
