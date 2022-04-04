import requests
import json

#Took information from API to parse into Hotel.html after adding a "Price" attribute under hotelInfo.json

url = "https://leejaew-hotels-in-singapore-v1.p.rapidapi.com/hotels"

querystring = {"country":"Singapore"}

headers = {
	"X-RapidAPI-Host": "leejaew-hotels-in-singapore-v1.p.rapidapi.com",
	"X-RapidAPI-Key": "db6e55f4f3mshf88108bb0ec0e42p16c681jsn401df87f50ed"
}

response = requests.request("GET", url, headers=headers, params=querystring)

print(response.text)

with open('test.json','w') as outfile:
	outfile.write(response.text)
