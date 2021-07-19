import React, { useState } from "react";
import "./App.css";
import LocationSearchBar from "./Components/LocationSearchBar";
import Data from "./Components/data";
import Landingpage from "./Components/LandingPage";

function App() {
  // landing page
  const [showLandingPage, setShowLandingPage] = useState(true);
  const getButtonStateFromChild = (val) => {
    setShowLandingPage(val);
  };

  // REQUESTS
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSugestions] = useState("");
  const [geometryLocation, setGeometryLocation] = useState({});

  // request to Google Maps auto suggestions api
  const fetchSugestions = async () => {
    try {
      const response = await fetch(
        `https://83phypjdqh.execute-api.us-east-2.amazonaws.com/staging/woltapi?apitype=placesapi&userInput=${userInput}`
      );
      if (response.ok) {
        console.log(userInput);
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        const suggestionsRawData = jsonResponse.predictions;
        setSugestions(suggestionsRawData);
        return suggestions;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // request to Google Maps geo-location api, using the chosen location from the suggestions
  const selectAddress = async (suggestion) => {
    const chosenLocation = suggestion.place_id;
    console.log(chosenLocation)
    try {
      const response = await fetch(
        `https://83phypjdqh.execute-api.us-east-2.amazonaws.com/staging/woltapi?apitype=geolocationapi&chosenLocation=${chosenLocation}`
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        setGeometryLocation(jsonResponse.result.geometry.location);
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

    // GET OUT OF REACH STATE FROM DATA.JS
    const [outOfReachMassage, setOutOfReachMassage] = useState(false);
    const getOutOfReachStateFromChild = (val) => {
      setOutOfReachMassage(val);
    };

  return (
    <>
        {showLandingPage === true && (
          <Landingpage sendButtonStateToParent={getButtonStateFromChild} />
        )}
        {!cards.length && showLandingPage === false ? (
            <LocationSearchBar
              setUserInput={setUserInput}
              userInput={userInput}
              fetchSugestions={fetchSugestions}
              suggestions={suggestions}
              selectAddress={selectAddress}
              outOfReachMassage={outOfReachMassage}
            />
        ) : null}
        {/* {outOfReachMassage == true && (
          <p>There aren't any restaurants on Wolt near you yet</p>
        )} */}
        {showLandingPage === false && (
            <Data
              geometryLocation={geometryLocation}
              sendCardsStateToParent={getCardsStateFromChild}
              sendOutOfReachStateToParent={getOutOfReachStateFromChild}
            />
        )}
    </>
  );
}

export default App;
