import React from "react";

function MatchList(props) {

  const print = () => {
    console.log(props);
  }

  return (
    <>
  <button onClick={print}>MatchList</button>
    </>
  );
}

export default MatchList;
