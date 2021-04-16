import React, { useState } from "react";

function useForceUpdate() {
  const [suggestionsList, setSuggestionsList] = useState([]); // integer state
  return () => setSuggestionsList([]); // update the state to force render
}

function SuggestionsBox(suggestions) {
  // const suggestionsList = suggestions != null && suggestions.map((suggestion) =>
  //     <li>{suggestion.description}</li>
  //   );

  const forceUpdate = useForceUpdate();
  let suggestionsList = new Map(Object.entries(suggestions));
//   console.log(suggestionsList.length);
//   console.log("SB:", suggestionsList);
//   console.log("SB:", suggestionsList);

  return (
    <div>
      {suggestionsList.length ? (
        suggestionsList.map((suggestion) => (
          <li>{suggestion.description}</li>
        ))
      ) : (
        <p>Loading</p>
      )}
      <button onClick={forceUpdate}>Click to re-render</button>
    </div>
  );
}

export default SuggestionsBox;
