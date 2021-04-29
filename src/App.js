import React, { useState, useEffect } from "react";
import "./App.css";
import LocationSearchBar from "./Components/LocationSearchBar";
import Data from "./Components/data";

function App() {
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSugestions] = useState("");
  const [geometryLocation, setGeometryLocation] = useState({});

  const fetchSugestions = async () => {
    try {
      const response = await fetch(
        `https://83phypjdqh.execute-api.us-east-2.amazonaws.com/staging/woltapi?apitype=placesapi&userInput=${userInput}}`
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
      // console.log("chosenLocation:", chosenLocation);
      const response = await fetch(
        `https://83phypjdqh.execute-api.us-east-2.amazonaws.com/staging/woltapi?apitype=geolocationapi&chosenLocation=${chosenLocation}`
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        // console.log(jsonResponse);
        setGeometryLocation(jsonResponse.result.geometry.location);
        // console.log("geometryLocation:", geometryLocation);
        return geometryLocation;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // GET CARDS STATE FROM DATA.JS
  const [cards, setCards] = useState([]);
  const getCardsStateFromChild = (val) => {
    setCards(val);
   };

  return (
    <>
      <div>
        <h1>title</h1>
      </div>
      {!cards.length && (
        <div>
          <h2>hiii</h2>
          <LocationSearchBar
            setUserInput={setUserInput}
            userInput={userInput}
            fetchSugestions={fetchSugestions}
            suggestions={suggestions}
            selectAddress={selectAddress}
          />
        </div>
      )}
      <div>
        <Data
          geometryLocation={geometryLocation}
          sendCardsStateToParent={getCardsStateFromChild}
        />
      </div>
    </>
  );
}

export default App;
