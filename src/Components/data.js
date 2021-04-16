import LocationSearchBar, { geometryLocation } from './LocationSearchBar';

// function to get restaurants data
const getRawData = async () => {
    const geo = await geometryLocation;
    console.log(geo)
    const woltCatagoryJsonId = 10;
    
    try {
      const response = await fetch(
        `https://83phypjdqh.execute-api.us-east-2.amazonaws.com/staging/woltapi?lat=${geo.lat}&lon=${geo.lon}`
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        const restaurants = jsonResponse.sections[woltCatagoryJsonId].items;
        console.log(restaurants);
        console.log(restaurants[1].image.url)
        return restaurants;
      }
    } catch (error) {
      console.log(error);
    }
};
  
  // restaurants data model - construct a class to save the relevant data from each restaurant
  class restaurant {
    constructor(title, tags, rating, image_url, link,  delivers, short_description) {
      this.title = title;
      this.tags = tags;
      this.rating = rating;
      this.image_url = image_url;
      this.link = link;
      this.delivers = delivers;
      this.short_description = short_description;
    }
  };
    
  // loop through the raw data and save it to an array of restaurant
  export const organizeRawData = async () => {
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
          rawData[i].venue.short_description
        )
      );
    // slice restaurants that are not open for delivery
    for (let i = 0; i < restaurantArr.length; i++) {
    if (restaurantArr[i].delivers === false) {
        restaurantArr.slice(restaurantArr[i]);
     }}
    }
    console.log(restaurantArr);
    // only show first 10 restaurantas
    return restaurantArr.slice(10, restaurantArr.length);
  };