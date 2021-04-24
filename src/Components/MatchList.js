import React from "react";

function MatchList(props) {
  const matches = props.matches;

  function printIt() {
    console.log(matches);
    matches.map((match) => <div>
      <p>{match.title}</p>
    </div>);
  }

  return (
    <>
      <button onClick={printIt}>Matches</button>
    </>
  );
}

export default MatchList;
