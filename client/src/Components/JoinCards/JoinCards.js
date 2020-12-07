import React, { useState, useEffect } from "react";
import "./JoinCards.css";
import JoinCard from "react-tinder-card";
import axios from "axios";

function JoinCards() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get("/join/cards");

      setPeople(req.data);
    }
    fetchData();
  }, []);
  console.log(people);
  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    // setLastDirection(direction)
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen");
  };
  return (
    <div className="joinCards">
      <div className="jointinderCards__cardContainer">
        {people.map((person) => (
          <JoinCard
            className="swipe"
            key={person.name}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}
          >
            <div
              style={{ backgroundImage: `url(${person.imgUrl})` }}
              className="card"
            >
              <h3>{person.name}</h3>
            </div>
          </JoinCard>
        ))}
      </div>
    </div>
  );
}

export default JoinCards;
