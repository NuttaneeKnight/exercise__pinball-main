import "./App.css";
import React, { useEffect, useState } from "react";

export default function App() {
  const [location, setLocation] = useState({ lat: "", lon: "" });
  const [lists, setLists] = useState([]);

  const findCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setCurrentPosition);
    }
  };

  const setCurrentPosition = (pos) => {
    setLocation({
      lat: pos.coords.latitude.toString(),
      lon: pos.coords.longitude.toString()
    });
  };

  // without this, the inputs are one step behind
  useEffect(() => {
    console.log("location: ", location);
    console.log("lists: ", lists);
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation({ ...location, [name]: value.toString() });
  };

  const handleSubmit = () => {
    let lat = location["lat"];
    let lon = location["lon"];
    fetch(
      `https://pinballmap.com/api/v1/locations/closest_by_lat_lon.json?lat=${lat}&lon=${lon}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
        if (data && data.location) setLists(data.location.machine_names);
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="App">
      <div className="manualInput">
        <h1>Let's find the Pinball Location Near You!</h1>
        <h5>Simply put your cordinates below ↓ Don't know your coordinates?</h5>
        <h5>Just hit Near Me to auto-fill your cordinates, then hit Search!</h5>
        <br/>
        <input
          placeholder="latitude"
          name="lat"
          value={location["lat"]}
          onChange={handleChange}
        ></input>
        <input
          placeholder="longitude"
          name="lon"
          value={location["lon"]}
          onChange={handleChange}
        ></input>
        <button onClick={findCurrentLocation}>Near Me</button>
        <button onClick={handleSubmit}>Search</button>
        <div className="autoFill">
          
          <div className='list'>
            <ul>
              {lists.map((name) => (
                <ul>{name}</ul>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

