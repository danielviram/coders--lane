import React from "react";

import "./App.css";
import Header from "./Components/Header/Header";
import JoinCards from "./Components/JoinCards/JoinCards";
import SwipeButtons from "./Components/SwipeButtons/SwipeButtons";

function App() {
  return (
    <div className="App">
      {/* Header */}
      <Header />
      {/* JoinCards */}
      <JoinCards />
      {/* Swipe buttons */}
      <SwipeButtons />
    </div>
  );
}


export default App;
