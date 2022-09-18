import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Search(props) {
    /* let weather = {
        apiKey: "6ce164ccceb5199af9a11123001bc0df",
        fetchWeather: function (city) {
            fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apiKey
            )
                .then((response) => {
                    if (!response.ok) {
                        alert("Error: Not Found");
                        throw new Error("Error: Not Found");
                    }
                    return response.json();
                })
                .then((data) => this.displayWeather(data));
        },
        displayWeather: function (data) {
            const { name } = data;
            const { lon, lat } = data.coord;
            const { temp, humidity } = data.main;
            const { speed } = data.wind;

            // adds the name of the city
            document.querySelector(".city").innerText = name;
            // adds the temperature of the city
            document.querySelector(".temp").innerText =
                "Temperature: " + temp + " °C";
            // adds the humidity of the weather 
            document.querySelector(".humidity").innerText =
                "Humidity: " + humidity + "%";
            // adds a wind speed to the weather
            document.querySelector(".wind").innerText =
                "Wind speed: " + speed + " m/s";
            // lat and lon
            document.querySelector(".coord").innerText =
                "Longtidude: " + lon + " | Latitude: " + lat + "";

            console.log(temp);

        },
        search: function () {
            this.fetchWeather(document.querySelector(".search-bar").value);
        },
    }; */
    // const [location, setLocation] = useState("");

    function textChange(event) {
        props.setLocation(event.target.value);
    }

    function Enter(event) {
        props.Enter();
    }

    return (
        <div>
            <input type="text" class="search-bar" placeholder="Search for new location..."
                onChange={textChange} value={props.location}></input> 
            <button><FontAwesomeIcon icon={faSearch} onClick={Enter}/></button>
        </div>
    );
}

export default Search;


// document.querySelector(".search button").addEventListener("click", function () {
//     weather.search();
// });

// document
//     .querySelector(".search-bar")
//     .addEventListener("keyup", function (event) {
//         if (event.key == "Enter") {
//             weather.search();
//         }
//     });

// weather.fetchWeather("Waterloo");