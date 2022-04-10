import pandas as pd
import requests
import folium
import json
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for
import logging
from fuzzywuzzy import fuzz

### Flights API -wj ###

logging.basicConfig(level=logging.DEBUG)


def flightsPage():
    url = "https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v2/prices/nearest-places-matrix"

    querystring = {"origin": "KUL", "destination": "SIN", "flexibility": "0",
                   "currency": "SGD", "show_to_affiliates": "true", "limit": "1", "distance": "100"}

    headers = {
        "X-Access-Token": "a4513a2499b8fe893b280f163f979420",
        "X-RapidAPI-Host": "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
        "X-RapidAPI-Key": "db6e55f4f3mshf88108bb0ec0e42p16c681jsn401df87f50ed"
    }

    response = requests.request(
        "GET", url, headers=headers, params=querystring)

    # print(response)

    data = response.json()
    # print(data)
    # print(data['prices'])
    data = data['prices']

    return(data)


flightsData = flightsPage()

### Hotel API -wj ###

# with open('hotelInfo.json') as f:
#     dataHotel = json.load(f)

# print(data)


def hotelsFunction():
    # returns list of hotel names from hotels json
    data = hotelRecco()
    hotelsList = []
    for i in range(len(data)):
        data1 = data[i]
        data2 = data1["name"]
        hotelsList.append(data2)

    return (hotelsList)


def hotelRecco():
    f = open('hotelInfo.json')

    data = json.load(f)

    return (data)


def hotelsFunction():
    # returns list of hotel names from hotels json
    data = hotelRecco()
    hotelsList = []
    for i in range(len(data)):
        data1 = data[i]
        data2 = data1["name"]
        data3 = str(data2)
        data3 = data3.lower()
        data3 = data3.strip()
        new_string = ''.join(filter(str.isalnum, data3))
        hotelsList.append(new_string)

    return (hotelsList)


hotelReccoCard = hotelRecco()
hotelNameCard = hotelsFunction()


# print(hotelsFunction())
# print(hotelReccoCard)
# print(len(hotelReccoCard))
# print(len(hotelsFunction()))

# for i in range(len(hotelNameCard)):
#     print(hotelNameCard[i])

### Attraction API -wj ###


def attractionPage():
    g = open('attractionInfo.json')

    hotelData = json.load(g)

    return (hotelData)


attractionData = attractionPage()

Str1 = "My name is Ali"
Str2 = "My name is Ali Abdaal"
Ratio = fuzz.ratio(Str1.lower(), Str2.lower())
print(Ratio)

app = Flask(__name__)
# print(hotelsFunction())


@app.route('/')  # landing page
def home():
    return render_template("home.html")


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get("floatingInput")
        print(email)

    return render_template("login.html")


@app.route('/signup')
def signup():
    return render_template("signup.html")


@app.route('/attractions')
def attractions():
    no_adults = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    no_children = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return render_template("attractions.html", no_adults=no_adults, no_children=no_children, result=attractionData)


@app.route('/attractionsResult')
def attractionsResult():
    no_adults = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    no_children = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    plan_no = ["Plan Number:", 1, 2]
    return render_template("attractionsResult.html", no_adults=no_adults, no_children=no_children, result=attractionData, plan_no=plan_no)


@app.route('/flights')
def flights():
    flight_class = ["Economy", "Business", "First Class"]
    no_travellers = ["Travellers:", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return render_template("flights.html", flight_class=flight_class, no_travellers=no_travellers, result=flightsData)


@app.route('/flightsResult')
def flightsResult():
    flight_class = ["Economy", "Business", "First Class"]
    no_travellers = ["Travellers:", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return render_template("flightsResult.html", flight_class=flight_class, no_travellers=no_travellers, result=flightsData)
    # return render_template("flightsResult.html", result = flightsData)


randomList = []


@app.route('/hotels', methods=["GET", "POST"])
def hotels():
    no_adults = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    no_children = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    # for j in range(len(hotelNameCard)):
    #     app.logger.info(hotelNameCard[j])
    count = 1

    if request.method == 'POST':
        temp = request.form["searchHotels"]
        temp2 = str(temp)
        temp2 = temp2.lower()
        temp2 = temp2.strip()
        temp3 = ''.join(filter(str.isalnum, temp2))
        print(temp3)
        if len(temp3) == 0:
            return render_template("hotels.html", no_adults=no_adults, no_children=no_children, result=hotelReccoCard)

        return redirect(url_for("hello", temp2=temp3))

        # for i in range(len(hotelNameCard)):
        #     hotelData = hotelNameCard[i]
        #     if temp3 == hotelData:
        #         app.logger.info("match")
        #         return redirect(url_for("hello", temp2=temp3))
        #     elif count == len(hotelNameCard):
        #         return render_template("hotels.html", no_adults=no_adults, no_children=no_children, result=hotelReccoCard)
        #     else:
        #         app.logger.info("no match")
        #     count = count+1

    else:
        return render_template("hotels.html", no_adults=no_adults, no_children=no_children, result=hotelReccoCard)


@app.route("/<temp2>")
def hello(temp2):
    no_adults = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    no_children = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    plan_no = ["Plan Number:", 1, 2]
    finalList = []
    bigData = hotelRecco()
    count = 1

    # hotelsList2 = hotelsFunction()

    # for j in range(len(hotelNameCard)):
    #     app.logger.info(hotelNameCard[j])
    app.logger.info("not success")
    temp2 = str(temp2)
    for i in range(len(bigData)):
        hotelIndex = bigData[i]
        hotelName = hotelIndex["name"]
        tempHotelName = str(hotelName)
        tempHotelName = tempHotelName.lower()
        tempHotelName = tempHotelName.strip()
        finalHotelName = ''.join(filter(str.isalnum, tempHotelName))
        ratio = fuzz.ratio(temp2, finalHotelName)
        # print(finalHotelName)
        # print(hotelName)
        print(ratio)
        if ratio > 70:
            app.logger.info("success")
            finalList.append(bigData[i])
        elif count == len(bigData) and len(finalList) == 0:
            return render_template("hotelsEmpty.html", no_adults=no_adults, no_children=no_children, result=hotelReccoCard)
        else:
            continue

        count = count+1

        # for j in range(len(randomList)):
        #     if randomList[j] == hotelName:
        #         finalList.appendß(bigData[i])

    return render_template("hotelsResult.html", no_adults=no_adults, no_children=no_children, result=hotelReccoCard, plan_no=plan_no, finalList=finalList)


@app.route('/hotelsResult')
def hotelsResult():
    no_adults = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    no_children = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    plan_no = ["Plan Number:", 1, 2]
    # hotelInput = request.args.get('hotelInput', None)

    return render_template("hotelsResult.html", no_adults=no_adults, no_children=no_children, result=hotelReccoCard, plan_no=plan_no)


@app.route('/transport')
def transport():
    transportMode = ["Mode of Transport:", "driving",
                     "walking", "bicycling", "transit", "flying"]
    return render_template("transport.html", transportMode=transportMode)


@app.route('/account', methods=['GET', 'POST'])
def account():

    if request.method == 'POST':
        print(request.form)
        # planName = request.form.get("planName")
    return render_template("account.html")


@app.route('/plans')
def plans():
    return render_template("plans.html", result=flightsData)


@app.route('/emptyPlan')
def emptyPlan():
    return render_template("emptyPlan.html")


@app.route('/settings')
def settings():
    return render_template("settings.html")


@app.route('/about')
def about():
    return render_template("about.html")


@app.route('/signout')
def signout():
    return render_template("signout.html")


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8080, debug=True)
