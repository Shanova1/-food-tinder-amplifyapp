const fetch = require('node-fetch');


exports.handler = async (event) => {
  let params = event.queryStringParameters;
  let WoltResponse = await fetch("https://restaurant-api.wolt.com/v1/pages/front?lat="+ params.lat +"&lon=" + params.lon, {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-GB,en;q=0.9,en-US;q=0.8,he;q=0.7",
      "app-language": "he",
      "platform": "Web",
      "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "w-wolt-session-id": "9bbf2182-e8a9-4fd9-873b-cd40b530a026",
      "x-wolt-web-clientid": "4287d618b66a3af72df55c59c8796510",
      "cookie": "intercom-id-qwum5ehb=c6c47c12-852d-4424-8634-c9d9e6471e4f; intercom-session-qwum5ehb=; G_ENABLED_IDPS=google"
    },
    "referrer": "https://wolt.com/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  });

  let WoltData = await WoltResponse.json();
  //console.log(JSON.stringify(WoltData));


  const response = {
      statusCode: 200,
      body: JSON.stringify(WoltData),
      headers: {
          "Access-Control-Allow-Origin": "*",
      }
  };
  return response;
};

//exports.handler({'queryStringParameters': {'lat': 32.0853, 'lon': 34.7818}})