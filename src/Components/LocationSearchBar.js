import React, { useState } from "react";
import "./LocationSearchBar.css";
import logo from "../pics/logo2.png";

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
    outOfReachMassage,
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
      <div className="location-bar-container">
        <div className="search-container">
          <img className="logo" alt="log" src={logo} />
          <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
              <input
                className="search-box"
                type="text"
                placeholder="Enter Address in English"
                onInput={handleInput}
                value={userInput}
              />
              {outOfReachMassage == false &&
              <div className="suggestions-container">
                <ul className="options">
                  {suggestions.length && showOptions && userInput
                    ? suggestions.map((suggestion) => (
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
                    : null}
                </ul>
              </div>
              }
            </form>
            {outOfReachMassage == true && (
              <>
              <p className="out-of-reach-p">There aren't any restaurants on Wolt near you yet</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default LocationSearchBar;
