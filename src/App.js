import React, {useState} from "react";
import axios from 'axios'
function App() {
  const[data, setData] = useState({})
  const[location, setLoccation] = useState('')

  //Api url
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&unit=imperial&appid=e53683933bda4624a280e805eba63388&units=imperial`

  //Enters the search bar upon the Enter key event
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLoccation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
        value={location}
        onChange={event => setLoccation(event.target.value)}
        placeholder="Enter City Location(U.S)"
        onKeyDown={searchLocation}
        type="text"/>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()} °F</h1> : null}
          </div>
          <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined &&
          <div className="bottom">
          <div className="feels">
            {data.main ? <p className="bold">{data.main.feels_like.toFixed()} °F</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity.toFixed()}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
        }
       
      </div>
    </div>
  );
}

export default App;
