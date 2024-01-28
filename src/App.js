import "./App.css";
import Map from "./components/Map";
import "./App.css";
import { Button, TextField, Typography, Paper } from "@mui/material";
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
  const [position, setPosition] = useState([48.2082, 16.3719]);

  const showError = () => toast("Something went wrong, please try again.");

  const handleLatitudeChange = (e) => {
    const newLatitude = e.target.value;
    if (/^[0-9.]*$/.test(newLatitude)) {
      setCoords((prevCoords) => ({
        ...prevCoords,
        lat: newLatitude,
      }));
    }
  };

  const handleLongitudeChange = (e) => {
    const newLongitude = e.target.value;

    if (/^[0-9.]*$/.test(newLongitude)) {
      setCoords((prevCoords) => ({
        ...prevCoords,
        lng: newLongitude,
      }));
    }
  };

  const onSubmit = async (location) => {
    try {
      setPosition([
        location ? location.lat : coords.lat,
        location ? location.lng : coords.lng,
      ]);
      const apiResult = await getElevation({
        coords: location ? location : coords,
      });
      setElevation(parseFloat(apiResult?.elevation).toFixed(2));
    } catch (error) {
      showError();
      setCoords({ lat: null, lng: null });
    }
  };

  return (
    <div className="App">
      <div className="element-wrapper">
        <TextField
          error={Boolean(latError)}
          helperText={latError}
          onBlur={(e) => {
            if (e.target.value) {
              const valid = isCoordinateValid(
                "latitude",
                parseFloat(e.target.value)
              );
              if (valid === false) {
                setLatError("must be between -90 and 90 degrees.");
                setElevation(null);
              } else {
                setLatError("");
              }
            } else {
              setLatError("");
            }
          }}
          className="input"
          value={coords.lat}
          onChange={handleLatitudeChange}
          placeholder="Latitude"
          variant="outlined"
        />
        <TextField
          error={Boolean(lngError)}
          helperText={lngError}
          onBlur={(e) => {
            if (e.target.value) {
              const valid = isCoordinateValid(
                "longitude",
                parseFloat(e.target.value)
              );
              if (valid === false) {
                setLngError(
                  "Longitude must be a valid number between -180 and 180 degrees."
                );
                setElevation(null);
              } else {
                setLngError("");
              }
            } else {
              setLngError("");
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
          disabled={!coords.lat || !coords.lng || latError || lngError}
          onClick={() => {
            onSubmit();
          }}
          variant="contained"
        >
          Submit
        </Button>
        <Paper
          className="elevation-wrapper"
          elevation={elevation !== undefined ? elevation : 0}
        >
          <Typography variant="h6">
            Elevation is:{" "}
            {elevation !== undefined ? elevation : "Select a location"}
          </Typography>
        </Paper>
      </div>
      <ToastContainer />
      <Map
        userPosition={position}
        setClickedLocation={(location) => {
          setLatError("");
          setLngError("");
          setCoords({ lat: location.lat, lng: location.lng });
          onSubmit(location);
        }}
      />
    </div>
  );
}

export default App;
