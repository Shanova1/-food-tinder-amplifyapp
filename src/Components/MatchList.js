import React, { useState, useEffect } from "react";
import "./MatchList.css";

import logo from "../pics/logo2.png";

function MatchList(props) {
  const matches = props.matches;
  // const matches = [
  //   {
  //       "title": "קיורטוש | בוגרשוב",
  //       "tags": [
  //           "מאפיה",
  //           "עוגה",
  //           "קינוח"
  //       ],
  //       "rating": 9.2,
  //       "image_url": "https://prod-wolt-venue-images-cdn.wolt.com/s/LVAcCEOV_2LQhAKlkuyDn4w_wjmfKJXEtTj7bIiCr_Y/5f18103e2af1ff01cc925a65/7e20c304-cc04-11ea-97fa-b22bb11e5078_3794c116_c9ce_11ea_acef_2a958b7bdd2d_list.jpg",
  //       "link": "https://wolt.com/he/isr/tel-aviv/restaurant/kiortosh-bugrashov",
  //       "delivers": true,
  //       "short_description": "עוגות, עוגיות ומאפים - כשר למהדרין",
  //       "id": "5f18103e2af1ff01cc925a65"
  //   },
  //   {
  //       "title": "כספי | כיכר מסריק",
  //       "tags": [
  //           "ארוחות בוקר",
  //           "ים תיכוני"
  //       ],
  //       "rating": 8.6,
  //       "image_url": "https://prod-wolt-venue-images-cdn.wolt.com/s/NXrWJYSxTK5tMPsLdzoA_Ag2yHXrTFdZW75tTcFUK3g/5bfb2e0938f911000c85d758/c52e3168-8eb6-11ea-9ef8-0a58647f85fd__dsc6903_edit.jpg",
  //       "link": "https://wolt.com/he/isr/tel-aviv/restaurant/kaspimasarik",
  //       "delivers": true,
  //       "short_description": "מסעדת חומוס שכונתית",
  //       "id": "5bfb2e0938f911000c85d758"
  //   },
  //   {
  //       "title": "גולדה | בן יהודה ",
  //       "tags": [
  //           "קינוח",
  //           "גלידה",
  //           "מתוקים"
  //       ],
  //       "rating": 9.4,
  //       "image_url": "https://prod-wolt-venue-images-cdn.wolt.com/s/rvXfM-2CggpyZnYy_JPppI2aPh_VXqn_QgNFc6DyUcU/5d221c3feddae55a93a9afd3/be05f3d0-6b79-11eb-91d7-1257f1cb9d15_list__1_.jpg",
  //       "link": "https://wolt.com/he/isr/tel-aviv/restaurant/golda-ben-yehuda",
  //       "delivers": true,
  //       "short_description": "בוטיק של טעמים",
  //       "id": "5d221c3feddae55a93a9afd3"
  //   }
  
  // ]

  const [showMatches, setShowmatches] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowmatches(true)
    }, 500);
  }, []);

  return (
    <>
      <div className="match-page">
      <img className="match-logo" src={logo} />
      <h1 className="match-h1">It's a Match!</h1>
      <h3 className="match-h3">Click to order on Wolt</h3>
      {showMatches == true &&
        <div className="match-cards-container">
        {matches.map((match) => (
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
        ))}
      </div>}
      </div>
    </>
  );
}

export default MatchList;
