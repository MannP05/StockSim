import requests
import json

#sets api key from file 
API_KEY = open("API_KEY.txt").read().strip()

data = requests.get(
    "https://api.eoddata.com/Quote/List/NASDAQ",
    params={
      "ApiKey": API_KEY
    }
)


with open("nasdaq_data.txt", "wb") as f: #save data as txt file 
    f.write(data.content)
print("Data saved to nasdaq_data.json") #print message 