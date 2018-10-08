import React, { Component } from 'react';
import './App.css';
import WeatherPage from './components/weather/weatherPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WeatherPage />
      </div>
    );
  }
}

export default App;
