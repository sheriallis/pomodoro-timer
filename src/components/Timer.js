import React from "react";

function Timer({mode, session_length, break_length, reset, countDownTimer}) {
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

      <div className="wrapper">
        <button id="start_stop" onClick={() => {
          countDownTimer(session_length)
        }}>
          <i className="fas fa-play" /> Start
        </button>
        <button id="reset" onClick={reset}>
          <i className="fas fa-sync-alt" /> Reset
        </button>
      </div>
    </React.Fragment>
  );
}

export default Timer;
