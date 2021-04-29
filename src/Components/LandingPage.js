import React from 'react'

function Landingpage(props) {
    
      // send button state to parent
      const buttonStateToParent = (val) => {
        props.sendButtonStateToParent(val);
      };

    const handleClick = (e) => {
        buttonStateToParent(false);
    }

    return (
        <>
            <h1>Logo</h1>
            <h2>Stop searching,</h2>
            <h2>start eating!</h2>
            <p>swipe right to like a restaurant</p>
            <p>---</p>
            <p>If both players Like the restaurant, it's a Match!</p>
            <button onClick={handleClick}>START</button>
        </>
    )
}

export default Landingpage;