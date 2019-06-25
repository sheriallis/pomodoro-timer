import React from "react";

function Timer({mode, displayTime, session_length, reset, countDownTimer}) {
  return (
    <React.Fragment>
      <h2 id="timer-label">{mode}</h2>
      <div id="time-left">{`${displayTime < 10 ? 0 : ""}${displayTime}:00`}</div>
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
