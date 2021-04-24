// import LocationSearchBar, { geometryLocation } from './LocationSearchBar';
import React, { useState } from "react";
import ReactDOM from 'react-dom';
import Deck from "./Deck";
import "./data.css";
import MatchList from "./MatchList";

function Data(props) {
  // GET RESTAURANTES DATA
  const [woltRestaurants, setWoltRestaurants] = useState([]);

  // function to get restaurants data
  const getRawData = async () => {
    console.log(props);
    const geo = props.geometryLocation;
    console.log(geo);
    const woltCatagoryJsonId = 10;

    try {
      const response = await fetch(
        `https://83phypjdqh.execute-api.us-east-2.amazonaws.com/staging/woltapi?lat=${geo.lat}&lon=${geo.lng}`
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        const restaurants = jsonResponse.sections[woltCatagoryJsonId].items;
        console.log("restaurants:", restaurants);
        return restaurants;
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
    console.log("rawData:", rawData);
    if (rawData !== undefined) {
      let restaurantArr = [];
      for (let i = 0; i < rawData.length; i++) {
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
      console.log("restaurantArr:", restaurantArr);
      setWoltRestaurants(restaurantArr);
      return woltRestaurants;
    } else {
      console.log("rawData is undefined, this is rawData", rawData);
      // const massage = <p>There aren't any restaurants on Wolt near you yet</p>
      // ReactDOM.render(massage, document.getElementById('error-massage'));
    }
  };

  // AFTER DATA HAS BEEN SHOWN AND MATCHED, GET MATCH ARRAY FROM DECK.JS
  const [matchDisplayState, setMatchDisplayState] = useState([]);

  const getMatchDataFromChild = (val) => {
    setMatchDisplayState(val);
    console.log(val);
  };

  return (
    <>
      {woltRestaurants.length ? (
        <p></p>
      ) : (
        <button onClick={organizeRawData}>Get Restaurants</button>
      )}
      {woltRestaurants.length ? (
        <Deck
          woltRestaurants={woltRestaurants}
          sendDataToParent={getMatchDataFromChild}
        />
      ) : (
        <p id="error-massage"></p>
      )}
      {matchDisplayState.length ? (
        <MatchList matches={matchDisplayState} />
      ) : (
        <p></p>
      )}
    </>
  );
}

export default Data;

// There aren't any restaurants on Wolt near you yet
