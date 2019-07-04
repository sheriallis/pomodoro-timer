import React from "react";

function Timer({mode, session_length, break_length}) {
  return (
    <React.Fragment>
      <h2 id="timer-label">{mode}</h2>
      <div id="time-left">
          {
          mode === "Session" ?
          `${session_length < 10 ? 0 : ""}${session_length}:00` :
          `${break_length < 10 ? 0 : ""}${break_length}:00`
          }
      </div>

    </React.Fragment>
  );
}

export default Timer;
