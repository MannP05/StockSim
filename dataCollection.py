import requests

#sets api key from file 
# API_KEY = open("API_KEY.txt").read().strip()
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
response = requests.get("https://api.eoddata.com/Profile/List/NASDAQ?ApiKey=ziDMPXnCDE8brGlo61fG8nOn", headers=headers)
response.raise_for_status()
print(response.text)
