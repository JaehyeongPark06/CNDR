// imports
import Map from './Components/Map';
import Header from './Components/Header';
import Loader from './Components/Loader';
import Search from './Components/Search';
import { useState, useEffect } from 'react';
import Info from './Components/footer';
import axios from 'axios';
import { useMainContext } from './Context/Context';
import { _api } from '@iconify/react';

// main function
function App() {
  const { setEventData, reRenderMarkers } = useMainContext();
  const [title, setTitle] = useState({});
  const [loading, setLoading] = useState(false);
  //Event to render
  const [renderEvent, setRenderEvent] = useState([]);
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=6ce164ccceb5199af9a11123001bc0df`;

  // changing the location when user sends an input
  function textChange(event) {
    setLocation(event);
    console.log(location);
  }

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const res = await fetch("https://eonet.gsfc.nasa.gov/api/v2.1/categories/8?limit=19");
      const { events } = await res.json();
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

  // recording the latitude and longitude of location entered by the user
  function Enter() {
    let userLatitude = 0;
    let userLongitude = 0;
    // calling the api when the user submits a request
    axios.get(WEATHER_API_URL).then((response) => {
      // setting the data to the information the api gives
      setWeatherData(response.data.coord);
      // logging lon and lat to console to check correctness
      console.log(response.data.coord.lon);
      console.log(response.data.coord.lat);
      // reassigning the value of latitude and longitude to the data
      userLatitude = response.data.coord.lat;
      userLongitude = response.data.coord.lon;

      let temp = title;
      // going through the coordinates of the user's inputed location
      temp.forEach((item) => {
        const fireLatitude = item.geometries[0].coordinates[1];
        const fireLongitude = item.geometries[0].coordinates[0];
        // finding the radius (distance from fire) of the location 
        const radius = Math.sqrt(Math.pow((fireLatitude - userLatitude), 2) + Math.pow((fireLongitude - userLongitude), 2));
        console.log(radius);
        // changing the value of the locations radius to the value we got
        item.radius = radius;

        /* danger level caluculator
if user is at high risk
if user is at medium risk 
if user is at low risk
if user is at no risk*/
        // high risk
        if (radius < 2.2) {
          console.log("Danger level is high");
          item.dangerLevel = "High";
        }
        // medium risk
        else if (1.5 <= radius && radius <= 3) {
          console.log("Danger level is medium")
          item.dangerLevel = "Medium";
        }
        // low risk
        else if (3 < radius && radius < 5) {
          console.log("Danger level is low")
          item.dangerLevel = "Low"
        }
        // no risk
        else {
          console.log("No Danger level");
          item.dangerLevel = "None"
        }
      });
      // sorting the radius from least to greatest 
      temp.sort((a, b) => (a.radius < b.radius) ? -1 : 1);
      // showing the radius in order from least to greatest
      setTitle(temp);
      console.log(title);
      console.log(temp);
    })


  }
  // loading images and data
  return (
    <div>
      <Header />
      {!loading ? <Map eventData={renderEvent} /> : <Loader />}
      {!loading && <Search location={location} setLocation={textChange} Enter={Enter} />}
      <Info fires={title} />
      <img class="tips" src="http://localhost:3000/tips.png" />
    </div>
  );
}

export default App;
