import pandas as pd
import requests
import folium
from datetime import datetime
from flask import Flask, render_template, request

re = requests.get("https://corona.lmao.ninja/v2/countries?yesterday&sort")
re = re.json()
re = pd.DataFrame.from_dict(re)
country_info = re['countryInfo']
country_info = pd.json_normalize(country_info)
df = pd.concat([re, country_info], axis=1,sort=False)
df = df.drop('countryInfo', axis=1)

def top_countries(n=10):
    by_country = df.groupby('country').sum()[['cases']]
    top_five = by_country.nlargest(n, 'cases')[['cases']]
    top_five['cases'] = top_five['cases'].apply(lambda x: "{:,}".format(x))
    return top_five

top_country = top_countries()

def convert_time_stamp(time):
    t = datetime.fromtimestamp(time / 1000.0)
    s = t.strftime('%d-%b-%Y %H:%M:%S')
    return s[:-3]

df['updated'] = df['updated'].apply(convert_time_stamp)
last_update = df['updated'][0]

df['recovered'] = df['recovered'].apply(lambda x: "{:,}".format(x))
df['cases'] = df['cases'].apply(lambda x: "{:,}".format(x))
df['deaths'] = df['deaths'].apply(lambda x: "{:,}".format(x))

m = folium.Map(
    tiles="CartoDB positron",
    location=[32,0],
    zoom_start=2,
)

country_geo = 'world-countries.json'
folium.Choropleth (
    geo_data= country_geo,
    data=df,
    columns=['lat', 'long'],
    key_on='feature.id',
    fill_color='YlGnBu',
    fill_opacity=0.7,
    line_opacity=0.2,
).add_to(m)

def circle_maker(x):
    folium.Circle(location=[x[0],x[1]],
                  radius=10,
                  color="red",
                  popup='{}\n Cases: {}\n Deaths: {}\n Recovered: {}'.format(x[2], x[3], x[4], x[5])).add_to(m)
df[['lat','long','country','cases','deaths', 'recovered']].apply(lambda x:circle_maker(x),axis=1)

html_map = m._repr_html_()

app = Flask(__name__)

@app.route('/') ##landing page
def home():
    return render_template("home.html", top_country=top_country,update=last_update, map=html_map)

@app.route('/login', methods = ['GET', 'POST'])
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
    return render_template("attractions.html")

@app.route('/flights')
def flights():
    flight_class = ["Economy", "Business", "First Class"]
    return render_template("flights.html", flight_class = flight_class)

@app.route('/hotels')
def hotels():
    return render_template("hotels.html")

@app.route('/hotelsResult')
def hotelsResult():
    return render_template("hotelsResult.html")

@app.route('/transport')
def transport():
    return render_template("transport.html")

@app.route('/account')
def account():
    return render_template("account.html")

@app.route('/settings')
def settings():
    return render_template("settings.html")

@app.route('/about')
def about():
    return render_template("about.html")



if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8080, debug=True)
