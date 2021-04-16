import React from 'react';
import './App.css';
import Deck from './Components/Deck'
import { LocationSearchBar } from './Components/LocationSearchBar'

function App() {
 
  return (
<>
{/* <div>
<h1>Food<span className="highlight">tind</span><span className="highlight2">er</span></h1>
</div> */}
<Deck />
<LocationSearchBar />
</>

  );
}

export default App;