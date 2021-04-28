import React from "react";

function MatchList(props) {
  const matches = props.matches;

  function printIt() {
    console.log(matches);
  }

  return (
    <>
      {/* <button onClick={printIt}>matches</button> */}
      <h1>It's a Match!</h1>
      <div className="cards-container">
        {matches.map((match) => (
          <div className="card">
            <img alt={match.title} src={match.image_url} className="img" />
            <div className="card-title">{match.title}</div>
            <div className="card-short_description">
              {match.short_description}
            </div>
              <div className="card-tags">{match.tags.join(", ")} | </div>
              <div className="card-rating">{match.rating}</div>
            <a href={match.link}>Click to order!</a>
          </div>
        ))}
      </div>
    </>
  );
}

export default MatchList;
