// import LocationSearchBar, { geometryLocation } from './LocationSearchBar';
import React, { useState } from "react";
import Deck from "./Deck";
import "./data.css";

function Data(props) {
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
        console.log(restaurants);
        console.log(restaurants[1].image.url);
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
    console.log("woltRestaurants:", woltRestaurants);
    return woltRestaurants;
  };

  return (
    <>
      <button onClick={organizeRawData}>Get Restaurants</button>
        {woltRestaurants.length ? <Deck woltRestaurants={woltRestaurants} /> : <p></p>}
    </>
  );
}

export default Data;
