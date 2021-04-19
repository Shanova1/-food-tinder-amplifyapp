import React from "react";

function MatchList(props) {

const matches = props.matches;

function printIt() {
  console.log(matches)
}

  return (
    <>
    <button onClick={printIt}>Matches</button>
    </>
  );
}

export default MatchList;
