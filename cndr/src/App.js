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
  const [title, setTitle] = useState({});
  const [loading, setLoading] = useState(false);
  //Event to render
  const [renderEvent, setRenderEvent] = useState([]);
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=6ce164ccceb5199af9a11123001bc0df`;

  function textChange(event) {
    setLocation(event);
    console.log(location);
  }

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const res = await fetch("https://eonet.gsfc.nasa.gov/api/v2.1/categories/8?limit=500");
      //Extract the Array contained in the 'events' field.
      const { events } = await res.json();
      //Event data is globally accessible. But 'renderEvent' is just to render out the MAP with the markers
      setEventData(events);
      setRenderEvent(events);
      setTitle(events);
      setLoading(false);
      console.log(events);
    }
    fetchEvents();
  }, [])

  useEffect(() => {
    if (reRenderMarkers !== null) {
      setRenderEvent(reRenderMarkers);
    }
  }, [reRenderMarkers])

  function Enter() {
    let userLatitude = 0;
    let userLongitude = 0;
    axios.get(WEATHER_API_URL).then((response) => {
      setWeatherData(response.data.coord);
      console.log(response.data.coord.lon);
      console.log(response.data.coord.lat);
      userLatitude = response.data.coord.lat;
      userLongitude = response.data.coord.lon;

      let temp = title;

      temp.forEach((item) => {
        const fireLatitude = item.geometries[0].coordinates[1];
        const fireLongitude = item.geometries[0].coordinates[0];
        const radius = Math.sqrt(Math.pow((fireLatitude - userLatitude), 2) + Math.pow((fireLongitude - userLongitude), 2));
        console.log(radius);
        item.radius = radius;
        // = radius;
        /* danger level caluculator
if user is at high risk
if user is at medium risk 
if user is at low risk
if user is at no risk*/
        if (radius < 2.2) {
          console.log("Danger level is high");
          item.dangerLevel = "High";
        }
        else if (1.5 <= radius && radius <= 3) {
          console.log("Danger level is medium")
          item.dangerLevel = "Medium";
        }
        else if (3 < radius && radius < 5) {
          console.log("Danger level is low")
          item.dangerLevel = "Low"
        } else {
          console.log("No Danger level");
          item.dangerLevel = "None"
        }
      });

      temp.sort((a,b) =>  (a.radius < b.radius) ? -1: 1);

      setTitle(temp);
      console.log(title);
      console.log(temp);
    })


  }

  return (
    <div>
      <Header />
      {!loading ? <Map eventData={renderEvent} /> : <Loader />}
      {!loading && <Search location={location} setLocation={textChange} Enter={Enter} />}
      <Info fires={title}/>
    </div>
  );
}

export default App;
