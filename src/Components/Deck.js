import React, { useEffect, useState } from "react";
import { useSprings, animated, to as interpolate } from "react-spring";
import { useDrag } from "react-use-gesture";
import "./Deck.css";

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

function Deck(props) {
  const cards = props.woltRestaurants;

  console.log(cards);

  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [likedRestaurants, setLikedRestaurants] = useState([]);
  const like = (restaurant) => {
    setLikedRestaurants((likedRestaurants) => [
      ...likedRestaurants,
      restaurant
    ]);
  };
  const [roundOneLikes, setRoundOneLikes] = useState([]);
  const [roundTwoLikes, setRoundTwoLikes] = useState([]);


  useEffect(() => {
    // set round 1 likes and reset a round's liked restaurants
    if (props.roundState === 2) {
      setRoundOneLikes(likedRestaurants);
      //restock cards
      setTimeout(() => gone.clear() || set((i) => to(i)), 1500);
      setLikedRestaurants([{id: "1"}]);
    }
  }, [props.roundState]);

  useEffect(() => {
    // set round 2 likes and reset a round's liked restaurants
    if (props.roundState === 3) {
      setRoundTwoLikes(likedRestaurants);
      setLikedRestaurants([{id: "1"}]);  
    }
  }, [props.roundState]);

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // match roundOneLikes & roundTwoLikes - return an array of only matching restaurants
    if (props.roundState === 3) {

    setMatches(roundOneLikes.filter((o1) =>
    roundTwoLikes.some((o2) => o1.id === o2.id)
    ));
  }
}, [roundTwoLikes]);

    useEffect(() => {
    // function to send state up to parent components
    const setMatchArray = (matches) => {
      props.sendMatchDataToParent(matches);
    };
    setMatchArray(matches);
  }, [matches]);

  // send round state to parent
  const roundStateToParent = (val) => {
    props.sendRoundStateToParent(val);
  };
  roundStateToParent(props.roundState);
  //

  const [propsCard, set] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2; // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      if (!down && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out

      // a round of cards
      set((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero

        // if swiped right (xDir > 0) push liked restauranted into array
        if (isGone && xDir > 0) like(cards[i]);

        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1; // Active cards lift up a bit

        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      // if all cards are gone increment round by 1
      if (!down && gone.size === cards.length) {
        roundStateToParent(props.roundState + 1);
      }
    }
  );
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  // the cards themselves
  return propsCard.map(({ x, y, rot, scale }, i) => (
    <>
      <animated.div
        className="deck-div"
        key={i}
        style={{ x, y }}
        id="card-container"
      >
        {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
        <animated.div
          className="card-div"
          key={i}
          {...bind(i)}
          style={{ transform: interpolate([rot, scale], trans) }}
        >
          <img alt={cards[i].title} src={cards[i].image_url} className="card-img" />
          <div className="card-title">{cards[i].title}</div>
          <div className="card-short_description">
            {cards[i].short_description}
          </div>
          <div className="card-bottom">
            <div className="card-tags">{cards[i].tags.join(", ")} | </div>
            <div className="card-rating">{cards[i].rating}</div>
          </div>
        </animated.div>
      </animated.div>
    </>
  ));
}

export default Deck;
