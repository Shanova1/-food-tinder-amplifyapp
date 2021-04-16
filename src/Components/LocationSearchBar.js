import React, { useState } from "react";

function LocationSearchBar(props) {
  const [address, setAddress] = useState("");
  const [suggestions, setSugestions] = useState("");
  const geometryLocation; 

  async function fetchSugestions() {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&key=AIzaSyCipUpKGSAQ-uZlrkg2R5GokfN--vG-uyo`
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

  const handleChange = (e) => {
    setAddress(e.target.value);
    fetchSugestions();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const selectAddress = async (suggestion) => {  
    const chosenLocation = suggestion.place_id;
      try {
          console.log("chosenLocation:", chosenLocation);
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?placeid=${chosenLocation}&key=AIzaSyCipUpKGSAQ-uZlrkg2R5GokfN--vG-uyo`
        );
        if (response.ok) {
          const jsonResponse = await response.json();
          geometryLocation = jsonResponse.result.geometry.location
          console.log(geometryLocation);
          return geometryLocation;
        }
      } catch (error) {
        console.log(error);
      }

  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} onInput={handleChange}/>
        {suggestions.length ? (
            suggestions.map((suggestion) => (
                <li key={suggestion.place_id} onClick={() => {selectAddress(suggestion)}}>{suggestion.description}</li>
            ))

    ) : (
    <p></p>
    )}
      </form>
    </>
  );
}

export default LocationSearchBar;
