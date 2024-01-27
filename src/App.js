import "./App.css";
import Map from "./components/Map";
import "./App.css";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getElevation } from "./services/getElevation";

function App() {
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });

  const handleLatitudeChange = (e) => {
    const newLatitude = parseFloat(e.target.value);
    setCoords((prevCoords) => ({
      ...prevCoords,
      latitude: isNaN(newLatitude) ? 0 : newLatitude,
    }));
  };
  const handleLongitudeChange = (e) => {
    const newLongitude = parseFloat(e.target.value);
    setCoords((prevCoords) => ({
      ...prevCoords,
      longitude: isNaN(newLongitude) ? 0 : newLongitude,
    }));
  };

  const onSubmit = async () => {
    const elevation = await getElevation({ coords });
    console.log("elevation", elevation);
  };

  return (
    <div className="App">
      <div className="textInputWrapper">
        <TextField
          onChange={handleLatitudeChange}
          type="text"
          label="Latitude"
          variant="outlined"
        />
        <TextField
          onChange={handleLongitudeChange}
          label="Longitude"
          variant="outlined"
        />
        <Button
          onClick={() => {
            onSubmit();
          }}
          variant="contained"
        >
          Submit
        </Button>
      </div>

      <Map />
    </div>
  );
}

export default App;
