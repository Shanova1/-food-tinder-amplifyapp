import React, { useState } from "react";
import "./LocationSearchBar.css";

function LocationSearchBar(props) {
  const [showOptions, setShowOptions] = useState(false);

  const {
    setUserInput,
    userInput,
    fetchSugestions,
    suggestions,
    selectAddress,
  } = props;

  const handleInput = (e) => {
    alert("onInput!");
    setShowOptions(true);
    setUserInput(e.target.value);
    fetchSugestions();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
