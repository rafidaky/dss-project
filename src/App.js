import "./App.css";
import Map from "./components/Map";
import "./App.css";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { getElevation } from "./services/getElevation";

function App() {
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [elevation, setElevation] = useState();

  const handleLatitudeChange = (e) => {
    const newLatitude = parseFloat(e.target.value);
    setCoords((prevCoords) => ({
      ...prevCoords,
      lat: isNaN(newLatitude) ? 0 : newLatitude,
    }));
  };
  const handleLongitudeChange = (e) => {
    const newLongitude = parseFloat(e.target.value);
    setCoords((prevCoords) => ({
      ...prevCoords,
      lng: isNaN(newLongitude) ? 0 : newLongitude,
    }));
  };

  const onSubmit = async (location) => {
    const apiResult = await getElevation({
      coords: location ? location : coords,
    });
    setElevation(apiResult?.elevation);
  };

  return (
    <div className="App">
      <div className="textInputWrapper">
        <TextField
          value={coords.lat}
          onChange={handleLatitudeChange}
          type="text"
          placeholder="Latitude"
          variant="outlined"
        />
        <TextField
          value={coords.lng}
          onChange={handleLongitudeChange}
          placeholder="Longitude"
          variant="outlined"
        />
        <Button
          disabled={!coords.lat || !coords.lng}
          onClick={() => {
            onSubmit();
          }}
          variant="contained"
        >
          Submit
        </Button>
        {elevation && <span>{`Elevation is: ${elevation}`}</span>}
      </div>

      <Map
        setClickedLocation={(location) => {
          setCoords({ lat: location.lat, lng: location.lng });
          onSubmit(location);
        }}
      />
    </div>
  );
}

export default App;
