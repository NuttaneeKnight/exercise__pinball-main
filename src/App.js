import "./styles.css";

import React, { useEffect, useState } from "react";

export default function App() {
  const [location, setLocation] = useState({ lat: "", lon: "" });

  const findCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setCurrentPosition);
    }
    handleSubmit();
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation({ ...location, [name]: value.toString() });
  };

  const handleSubmit = () => {
    fetch(
      "https://pinballmap.com/api/v1/docs/1.0/locations/closest_by_lat_lon.json"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="App">
      <div className="manualInput">
        <h1>Let's find the Pinball Location Near You!</h1>
        <h2>Simply put your cordinates below ↓</h2>
        <input
          placeholder="latitude"
          name="lat"
          onChange={handleChange}
        ></input>
        <input
          placeholder="longitude"
          name="lon"
          onChange={handleChange}
        ></input>
        <button onClick={handleSubmit}>Search</button>
        <div className="autoFill">
          <h2>Don't know your coordinates?</h2>
          <h3>Just hit Near Me</h3>
          <button onClick={findCurrentLocation}>Near Me</button>
          {/* {location.map((loc) => (
            <li>{loc.name}</li>
          ))} */}
        </div>
      </div>
    </div>
  );
}

