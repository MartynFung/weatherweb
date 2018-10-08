# Weather Api
This is the React App built for use with the weatherapi solution.

# Setup
- Clone this repo
- NOTE: the OpenWeatherApi key has not been included in this repo. Please sign up for an account at https://home.openweathermap.org/users/sign_up to obtain an API key. It may take a few hours before the key becomes active. 
Enter in the key under WeatherApiCore > Controllers > WeatherController.cs at "string apiKey = _____"
- Clone the weatherapi: https://github.com/MartynFung/weatherapi
- Open weatherapi with Visual studio 2017 > run with IIS Express
- Open weatherweb with VSCode > open console using CTRL+`
```
npm start
```
# OpenWeatherApi
- https://openweathermap.org/
- Example: http://api.openweathermap.org/data/2.5/weather?zip=92612,us&appid=ENTER_API_KEY_HERE

# Usage
- With the API and React Client running, enter in a valid US zipcode and click the "Get Weather" button
