// import LocationSearchBar, { geometryLocation } from './LocationSearchBar';
import React, { useState } from "react";
import Deck from "./Deck";
import "./data.css";
import MatchList from "./MatchList";

import logo from "../pics/logo2.png";

function Data(props) {
  // GET RESTAURANTES DATA
  const [woltRestaurants, setWoltRestaurants] = useState([]);

  // for out of reach locations
      // send cards state to parent
      const outOfReachStateToParent = (val) => {
        props.sendOutOfReachStateToParent(val);
      };

  // function to get restaurants data from wolt api using the geo-location from App.js
  const getRawData = async () => {
    const geo = props.geometryLocation;
    const woltCatagoryJsonId = 8; // random wolt Catagory

    try {
      const response = await fetch(
        `https://83phypjdqh.execute-api.us-east-2.amazonaws.com/staging/woltapi?apitype=woltapi&lat=${geo.lat}&lon=${geo.lng}`
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("jsonResponse:", jsonResponse);
        if (jsonResponse.city !== "out-of-reach") {
          const restaurants = jsonResponse.sections[woltCatagoryJsonId].items;
          console.log("restaurants:", restaurants);
          return restaurants;
        } else {
          outOfReachStateToParent(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


      // restaurants data model - construct a class to save the relevant data from each restaurant
  class restaurant {
    constructor(
      title,
      tags,
      rating,
      image_url,
      link,
      delivers,
      short_description,
      id
    ) {
      this.title = title;
      this.tags = tags;
      this.rating = rating;
      this.image_url = image_url;
      this.link = link;
      this.delivers = delivers;
      this.short_description = short_description;
      this.id = id;
    }
  }

  // loop through the raw data and save it to an array of restaurant
  const organizeRawData = async () => {
    const rawData = await getRawData();
    if (rawData !== undefined) {
      let restaurantArr = [];
      for (let i = 0; i < rawData.length; i++) {
        // fix bug when new restaurants on Wolt don't have ratings score yet
        if (rawData[i].venue.rating == null) {
          rawData[i].venue.rating = "N/A";
        }
        restaurantArr.push(
          new restaurant(
            rawData[i].title,
            rawData[i].venue.tags,
            rawData[i].venue.rating.score,
            rawData[i].image.url,
            rawData[i].link.target,
            rawData[i].venue.delivers,
            rawData[i].venue.short_description,
            rawData[i].venue.id
          )
        );
        // slice restaurants that are not open for delivery
        for (let i = 0; i < restaurantArr.length; i++) {
          if (restaurantArr[i].delivers === false) {
            restaurantArr.slice(restaurantArr[i]);
          }
        }
      }
      setWoltRestaurants(restaurantArr);
      return woltRestaurants;
    } else {
      console.log("rawData is undefined, this is rawData", rawData);
    }
  };

  // send cards state to parent
  const cardsStateToParent = (val) => {
    props.sendCardsStateToParent(val);
  };
  cardsStateToParent(woltRestaurants);

  // GET ROUND STATE FROM DECK.JS
  const [roundState, setRoundState] = useState(1);

  const getRoundStateFromChild = (val) => {
    setRoundState(val);
  };
  // AFTER DATA HAS BEEN SHOWN AND MATCHED, GET MATCH ARRAY FROM DECK.JS
  const [matchDisplayState, setMatchDisplayState] = useState([]);

  const getMatchDataFromChild = (val) => {
    setMatchDisplayState(val);
  };

  return (
    <>
      {/* {outOfReach == true && (
        <p>There aren't any restaurants on Wolt near you yet</p>
      )} */}
      {woltRestaurants.length ? null : (
        <div className="search-btn-container">
          <button className="search-btn" onClick={organizeRawData}>
            Get Restaurants
          </button>
        </div>
      )}
      {woltRestaurants.length && !matchDisplayState.length ? (
        <div className="logo-and-deck-container">
          <img className="deck-logo" alt="log" src={logo} />
          <div className="deck-page-container">
            <p className="swipe-p-top">Swipe right for YES ⟶</p>
            <p className="swipe-p-bottom">⟵ Swipe left for NO</p>
            <h3 className="player-h3">Player {roundState}</h3>
            <div className="deck-container">
              <Deck
                woltRestaurants={woltRestaurants}
                sendRoundStateToParent={getRoundStateFromChild}
                roundState={roundState}
                sendMatchDataToParent={getMatchDataFromChild}
              />
            </div>
          </div>
        </div>
      ) : null}
      {matchDisplayState.length ? (
        <MatchList matches={matchDisplayState} />
      ) : null}
    </>
  );
}

export default Data;

// There aren't any restaurants on Wolt near you yet
