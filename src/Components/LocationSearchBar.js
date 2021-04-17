import React, { useState } from "react";
import "./LocationSearchBar.css";

function LocationSearchBar(props) {

    const { 
        setAddress,
        address, 
        fetchSugestions, 
        suggestions, 
        selectAddress, 
        } = props;

  const handleChange = (e) => {
    setAddress(e.target.value);
    fetchSugestions();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClick = (e) => {
      e.target.element.className="selcted"
  }
  

  return (
    <>
      <span>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} onInput={handleChange} value={address} />
        <ul>
        {suggestions.length ? (
            suggestions.map((suggestion) => (
                <li key={suggestion.place_id} onClick={handleClick} onClick={() => {selectAddress(suggestion)}}>{suggestion.description}</li>
            ))

    ) : (
    <p></p>
    )}
    </ul>
      </form>
      </span>
    </>
  );
}

export default LocationSearchBar;
