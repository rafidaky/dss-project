import "./App.css";
import Map from "./components/Map";
import "./App.css";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { getElevation } from "./services/getElevation";
import { isCoordinateValid } from "./utils/isCoordinateValid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [elevation, setElevation] = useState();
  const [latError, setLatError] = useState("");
  const [lngError, setLngError] = useState("");
  const showError = () => toast("Something went wrong, please try again.");

  const handleLatitudeChange = (e) => {
    const newLatitude = parseFloat(e.target.value);
    setCoords((prevCoords) => ({
      ...prevCoords,
      lat: isNaN(newLatitude) ? "" : newLatitude,
    }));
  };
  const handleLongitudeChange = (e) => {
    const newLongitude = parseFloat(e.target.value);
    setCoords((prevCoords) => ({
      ...prevCoords,
      lng: isNaN(newLongitude) ? "" : newLongitude,
    }));
  };

  const onSubmit = async (location) => {
    try {
      const apiResult = await getElevation({
        coords: location ? location : coords,
      });
      setElevation(apiResult?.elevation);
    } catch (error) {
      showError();
      setCoords({ lat: null, lng: null });
    }
  };

  return (
    <div className="App">
      <div className="textInputWrapper">
        <TextField
          className="input"
          value={coords.lat}
          error={Boolean(latError)}
          helperText={latError}
          onBlur={(e) => {
            const valid = isCoordinateValid(
              "latitude",
              parseFloat(e.target.value)
            );
            if (valid === false) {
              setLatError(
                "Latitude must be a valid number between -90 and 90 degrees."
              );
            }
          }}
          onChange={handleLatitudeChange}
          type="text"
          placeholder="Latitude"
          variant="outlined"
        />
        <TextField
          error={Boolean(lngError)}
          helperText={lngError}
          onBlur={(e) => {
            const valid = isCoordinateValid(
              "longitude",
              parseFloat(e.target.value)
            );
            if (valid === false) {
              setLngError(
                "Longitude must be a valid number between -180 and 180 degrees."
              );
            }
          }}
          className="input"
          value={coords.lng}
          onChange={handleLongitudeChange}
          placeholder="Longitude"
          variant="outlined"
        />
        <Button
          className="button"
          disabled={!coords.lat || !coords.lng}
          onClick={() => {
            onSubmit();
          }}
          variant="contained"
        >
          Submit
        </Button>
        <div className="elevation_container">
          {elevation && (
            <Typography variant="h6" gutterBottom>
              {`Elevation is: ${elevation}`}
            </Typography>
          )}
        </div>
      </div>
      <ToastContainer />
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
