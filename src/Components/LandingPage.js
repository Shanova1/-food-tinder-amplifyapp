import React from "react";
import "./LandingPage.css";
import logo from "../pics/logo1-t.png";

function Landingpage(props) {
  // send button state to parent
  const buttonStateToParent = (val) => {
    props.sendButtonStateToParent(val);
  };

  const handleClick = (e) => {
    buttonStateToParent(false);
  };

  return (
    <>
      <div className="landing-page">
        <div className="text-container">
          <img className="logo" src={logo} />
          <div className="subtitle-container">
            <h2 className="subtitle-top">Stop searching,</h2>
            <h2 className="subtitle-bottom">start eating!</h2>
          </div>
          <p>Swipe right to like a restaurant,</p>
           <p>If both players like the restaurant, it's a match!</p>
          <button className="start-button" onClick={handleClick}>START</button>
        </div>
      </div>
    </>
  );
}

export default Landingpage;
