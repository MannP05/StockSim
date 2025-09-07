import requests
import json

#sets api key from file 
API_KEY = open("API_KEY.txt").read().strip()
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
response = requests.get(f"https://api.eoddata.com/Profile/List/NASDAQ?ApiKey={API_KEY}", headers=headers)
if response.status_code == 200:
    json_data = response.json()
    with open("data/NASDAQ_list.json", "w") as f: #write list of all nasdaq stocks to file
        json.dump(json_data, f, indent=4)
    print(f"Data saved: {len(json_data)} entries" )
else:
    print(f"Error: {response.status_code}")