import React, { useState } from "react";
import "./App.css";
import LocationSearchBar from "./Components/LocationSearchBar";
import Data from "./Components/data";

function App() {
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSugestions] = useState("");
  const [geometryLocation, setGeometryLocation] = useState({});

  async function fetchSugestions() {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${userInput}&key=AIzaSyCipUpKGSAQ-uZlrkg2R5GokfN--vG-uyo`
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        const suggestionsRawData = jsonResponse.predictions;
        setSugestions(suggestionsRawData);
        return suggestions;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const selectAddress = async (suggestion) => {
    const chosenLocation = suggestion.place_id;
    try {
      console.log("chosenLocation:", chosenLocation);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${chosenLocation}&key=AIzaSyCipUpKGSAQ-uZlrkg2R5GokfN--vG-uyo`
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        setGeometryLocation(jsonResponse.result.geometry.location);
        console.log(geometryLocation);
        return geometryLocation;
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
        <LocationSearchBar
          setUserInput={setUserInput}
          userInput={userInput}
          fetchSugestions={fetchSugestions}
          suggestions={suggestions}
          selectAddress={selectAddress}
        />
      <Data
        geometryLocation={geometryLocation}
      />
    </>
  );
}

export default App;
