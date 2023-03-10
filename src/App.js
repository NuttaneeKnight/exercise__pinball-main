import "./App.css";
import React, { useEffect, useState } from "react";

export default function App() {
  const [location, setLocation] = useState({ lat: "", lon: "" });
  const [venue, setVenue] = useState([]);
  const [lists, setLists] = useState([]);
  const [town, setTown] = useState([]);

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
        // console.log("data: ", data);
        if (data && data.location) 
        setLists(data.location.machine_names);
        setVenue(data.location.name);
        setTown(data.location.city);
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="App">
      <div className="manualInput">
        <h1>Let's find the Pinball Locations Near You!</h1>
        <h5>Simply put your cordinates below ↓ Don't know your coordinates?
          Just hit Near Me to auto-fill your cordinates, then hit Search 😁
        </h5>

        <div>
          <br />
          <input
            class="m-1 rounded border border-secondary text-secondary"
            placeholder="Lat: 00.0000000"
            name="lat"
            value={location["lat"]}
            onChange={handleChange}
          ></input>
          <input
            class="m-1 rounded border border-secondary text-secondary"
            placeholder="Long: -00.0000000"
            name="lon"
            value={location["lon"]}
            onChange={handleChange}
          ></input>
        </div>

        <div>
          <button
            class="btn btn-secondary btn-sm m-1"
            onClick={findCurrentLocation}
          >
            Near Me
          </button>
          <button class="btn btn-primary btn-sm m-1" onClick={handleSubmit}>
            Search
          </button>
        </div>

        <br />
        <div className="list">
          <ol key='list'>
            {lists.map((name) => (
              <li>{venue}, {town}: {name}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
