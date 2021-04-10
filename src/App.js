import React from 'react';
import './App.css';
import Deck from './Components/Deck'

function App() {
  return (
<>
<h1>Food<span className="highlight">tind</span><span className="highlight2">er</span></h1>
<h2>Find the perfect match</h2>
<h2>Swipe Left for EW, Swipe right for YUM</h2>
<Deck />
</>

  );
}

export default App;