import * as React from 'react';
import WeatherForm from './weatherForm';
import { ApiExecute } from '../common/apiExecute';

export default class WeatherPage extends React.Component {
    constructor() {
        super();
        this.state = {
            zip: '',
            currentWeather: {
                zip: '',
                city: '',
                weather: '',
                country: '',
                temp: 0,
                temp_min: 0,
                temp_max: 0,
                date: ''
            },
            fromCache: false
        }
    }

    onInputChange = (fieldName, fieldValue) => {
        let nextState = {
            ...this.state,
            [fieldName]: fieldValue
        }
        this.setState(nextState);
    }

    onClick = () => {
        if (sessionStorage.length > 20) {
            sessionStorage.clear();
        }
        if (sessionStorage.getItem(this.state.zip) !== null) {
            const cachedWeather = JSON.parse(sessionStorage.getItem(this.state.zip));
            let minuteDiff = this.getMinuteDiff(cachedWeather);
            if (minuteDiff <= 30) {
                this.showCachedWeather(cachedWeather);
            }
            else {
                console.log('Cached zip is over 30 minutes old. Remove this zip from sessionStorage. Retrieve new weather');
                sessionStorage.removeItem(this.state.zip);
                this.getNewWeather()
            }
        }
        else {
            this.getNewWeather();
        }
    }

    getMinuteDiff = (cachedWeather) => {
        let currentDate = Date.parse(new Date());
        let cachedWeatherDate = Date.parse(cachedWeather.date);

        let msDiff = currentDate - cachedWeatherDate;
        let minuteDiff = Math.round(msDiff / 1000 / 60);
        console.log('Minutes since last API call for this ZIP: ', minuteDiff);
        return minuteDiff;
    }

    showCachedWeather = (cachedWeather) => {
        console.log('Showing cached weather');
        let zip = this.state.zip;
        this.setState({
            ...this.state,
            zip: '',
            currentWeather: {
                zip: zip,
                city: cachedWeather.city,
                weather: cachedWeather.weather,
                country: cachedWeather.country,
                temp: cachedWeather.temp,
                temp_min: cachedWeather.temp_min,
                temp_max: cachedWeather.temp_max
            },
            fromCache: true
        })
    }

    getNewWeather = () => {
        console.log('No existing zip found in sessionStorage. Start API call');
        // TO RUN THIS APP: Change 'root' to the root of the weatherApi app when run locally
        let root = 'http://localhost:53828';
        ApiExecute(`${root}/api/weather/zip/${this.state.zip}`, "GET", null)
            .then(response => {
                console.log(response);
                if (response.city) {
                    this.showNewWeather(response);
                }
            })
            .catch(err => console.log("Error:", err));
    }

    showNewWeather = (response) => {
        let zip = this.state.zip;
        this.setState({
            ...this.state,
            zip: '',
            currentWeather: {
                zip: zip,
                city: response.city,
                weather: response.weather,
                country: response.country,
                temp: response.temp,
                temp_min: response.temp_min,
                temp_max: response.temp_max,
                date: new Date()
            },
            fromCache: false
        })
        sessionStorage.setItem(zip, JSON.stringify(this.state.currentWeather));
    }

    render() {
        return (
            <React.Fragment>
                <div className="box"></div>
                <h1>Weather App</h1>
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <WeatherForm
                            onClick={this.onClick}
                            onChange={this.onInputChange}
                            zip={this.state.zip}
                        />
                    </div>
                </div>

                <hr />
                <h1>Current Weather</h1>
                <p>Zip: <strong>{this.state.currentWeather.zip}</strong></p>
                <p>City: <strong>{this.state.currentWeather.city}</strong></p>
                <p>Country: <strong>{this.state.currentWeather.country}</strong></p>
                <p>Weather: <strong>{this.state.currentWeather.weather}</strong></p>
                <p>Temperature: <strong>{this.state.currentWeather.temp}°C</strong></p>
                <p>Temp_min: <strong>{this.state.currentWeather.temp_min}°C</strong></p>
                <p>Temp_max: <strong>{this.state.currentWeather.temp_max}°C</strong></p>
                <p>Retrieved from cache?: <strong>{this.state.fromCache ? 'Yes' : 'No'}</strong></p>
                <div className="box mt-5"></div>
            </React.Fragment>
        )
    }
}