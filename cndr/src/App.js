import Map from './Components/Map';
import Header from './Components/Header';
import Loader from './Components/Loader';
import Search from './Components/Search';
import { useState, useEffect } from 'react';
import Info from './Components/footer';
import axios from 'axios';
//import WEATHER_API_URL from './Components/api'
//Main Context
import { useMainContext } from './Context/Context'
import { _api } from '@iconify/react';

function App() {
  const { setEventData, reRenderMarkers } = useMainContext();
  const [loading, setLoading] = useState(false);
  //Event to render
  const [renderEvent, setRenderEvent] = useState([]);
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_URL}`;

  function textChange(event) {
    setLocation(event);
    console.log(location);
  }

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const res = await fetch("https://eonet.gsfc.nasa.gov/api/v2.1/events");
      //Extract the Array contained in the 'events' field.
      const { events } = await res.json();
      //Event data is globally accessible. But 'renderEvent' is just to render out the MAP with the markers
      setEventData(events);
      setRenderEvent(events);
      setLoading(false);
    }
    fetchEvents();
  }, [])

  useEffect(() => {
    if (reRenderMarkers !== null) {
      setRenderEvent(reRenderMarkers);
    }
  }, [reRenderMarkers])

  function Enter() {
    axios.get(WEATHER_API_URL).then((response) => {
      setWeatherData(response.data.coord);
      console.log(response.data.coord);
    })
  }

  return (
    <div>
      <Header />
      {!loading ? <Map eventData={renderEvent} /> : <Loader />}
      {!loading && <Search location={location} setLocation={textChange} Enter={Enter} />}
      <Info />
    </div>
  );
}

export default App;
