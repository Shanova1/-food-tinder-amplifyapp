const fetch = require("node-fetch");

exports.handler = async (event) => {
  let params = event.queryStringParameters;

  // places autolocation api request
  if (params.apitype == "placesapi") {
    let placesResponse = await fetch(
      "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" +
        params.userInput +
        "&key=AIzaSyCipUpKGSAQ-uZlrkg2R5GokfN--vG-uyo",
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-GB,en;q=0.9,en-US;q=0.8,he;q=0.7",
          "sec-ch-ua":
            '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
          "sec-ch-ua-mobile": "?0",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "x-client-data":
            "CKq1yQEIhbbJAQiitskBCMG2yQEIqZ3KAQj4x8oBCOOcywEIqZ3LAQikoMsBCK2gywEYjp7LAQ==",
        },
        referrer: "http://localhost:3000/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
      }
    );

    let placesData = await placesResponse.json();
    // console.log(JSON.stringify(placesData));
    const response = {
      statusCode: 200,
      body: JSON.stringify(placesResponse),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    return response;
  }

  // geolocation (lat&lon) api request
  else if (params.apitype == "geolocationapi") {
    let geolocationResponse = await fetch(
      "https://maps.googleapis.com/maps/api/place/details/json?placeid=" +
      params.chosenLocation +
      "&key=AIzaSyCipUpKGSAQ-uZlrkg2R5GokfN--vG-uyo",
      {
      headers: {
        accept: "*/*",
        "accept-language": "en-GB,en;q=0.9,en-US;q=0.8,he;q=0.7",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "x-client-data": "CKq1yQEIhbbJAQiitskBCMG2yQEIqZ3KAQj4x8oBCOOcywEIqZ3LAQikoMsBCK2gywEYjp7LAQ=="
      },
      referrer: "http://localhost:3000/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors"
    });

    // console.log(geolocationResponse);
    let geolocationData = await geolocationResponse.json();
    // console.log(JSON.stringify(geolocationData));
    
    const response = {
      statusCode: 200,
      body: JSON.stringify(geolocationResponse),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    return response;
  }
  // Wolt restaurantes api request
  else if (params.apitype == "woltapi") {
    let WoltResponse = await fetch(
      "https://restaurant-api.wolt.com/v1/pages/front?lat=" +
        params.lat +
        "&lon=" +
        params.lon,
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-GB,en;q=0.9,en-US;q=0.8,he;q=0.7",
          "app-language": "he",
          platform: "Web",
          "sec-ch-ua":
            '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "w-wolt-session-id": "9bbf2182-e8a9-4fd9-873b-cd40b530a026",
          "x-wolt-web-clientid": "4287d618b66a3af72df55c59c8796510",
          cookie:
            "intercom-id-qwum5ehb=c6c47c12-852d-4424-8634-c9d9e6471e4f; intercom-session-qwum5ehb=; G_ENABLED_IDPS=google",
        },
        referrer: "https://wolt.com/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
      }
    );

    let WoltData = await WoltResponse.json();
    //console.log(JSON.stringify(WoltData));

    const response = {
      statusCode: 200,
      body: JSON.stringify(event),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    return response;
  }
};

// exports.handler({'queryStringParameters': {'apitype': "placesapi", 'userInput': "tel aviv"}})

// exports.handler({'queryStringParameters': {'apitype': "geolocationapi", 'chosenLocation': "ChIJP0_fawpMHRURBp-AZxLV98g"}})