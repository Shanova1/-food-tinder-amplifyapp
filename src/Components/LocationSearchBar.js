import React, { useState } from "react";
import "./LocationSearchBar.css";

function LocationSearchBar(props) {
  // toggle options box
  const [showOptions, setShowOptions] = useState(false);

  // deconstruct props from App.js
  const {
    setUserInput,
    userInput,
    fetchSugestions,
    suggestions,
    selectAddress,
  } = props;

  // whenever a user types, the Google Maps auto suggestions api in App.js sends a request
  const handleInput = (e) => {
    setShowOptions(true);
    setUserInput(e.target.value);
    fetchSugestions();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // when a user chooses an address from the suggestions, the Google Maps geo-location api in App.js sends a request
  const onClick = (value) => {
    setUserInput(value);
    setShowOptions(false);
  };

  return (
    <>
        <div className="search">
          <form onSubmit={handleSubmit}>
            <input
              className="search-box"
              type="text"
              placeholder="Enter Address"
              onInput={handleInput}
              value={userInput}
            />
            <ul className="options">
              {suggestions.length && showOptions && userInput ? (
                suggestions.map((suggestion) => (
                  <li
                    key={suggestion.place_id}
                    onClick={() => {
                      onClick(suggestion.description);
                      selectAddress(suggestion);
                    }}
                  >
                    {suggestion.description}
                  </li>
                ))
              ) : (
                null
              )}
            </ul>
          </form>
        </div>
    </>
  );
}

export default LocationSearchBar;

// onClick={() => {selectAddress(suggestion)}}
