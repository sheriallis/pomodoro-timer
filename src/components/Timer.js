import React from "react";

function Timer({ mode, timeLeft }) {
  return (
    <React.Fragment>
      <h2 id="timer-label">{mode}</h2>
      <div id="time-left">{timeLeft}</div>
    </React.Fragment>
  );
}

export default Timer;
