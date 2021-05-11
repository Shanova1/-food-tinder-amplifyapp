import React, { useState, useEffect } from "react";
import "./MatchList.css";

import logo from "../pics/logo2.png";

function MatchList(props) {
  const matches = props.matches;

  // const [showMatches, setShowmatches] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShowmatches(true)
  //   }, 300);
  // }, []);

  return (
    <>
      <div className="match-page">
      <img className="match-logo" src={logo} />
      <h1 className="match-h1">It's a Match!</h1>
      <h3 className="match-h3">Click to order on Wolt</h3>

        <div className="match-cards-container">
       {
      //  showMatches == true &&         
        matches.map((match) => (
          <a href={match.link}>
          <div className="match-card">
            <img alt={match.title} src={match.image_url} className="match-card-img" />
            <div className="match-card-title">{match.title}</div>
            <div className="match-card-short_description">
              {match.short_description}
            </div>
            <div className="match-card-bottom">
              <div className="match-card-tags">{match.tags.join(", ")} | </div>
              <div className="match-card-rating">{match.rating}</div>
            </div>
          </div>
          </a>
        ))
          }    
      </div>

      </div>
    </>
  );
}

export default MatchList;
