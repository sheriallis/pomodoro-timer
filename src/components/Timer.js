import React from "react";

function Timer(props) {
  return (
    <React.Fragment>
      <h2 id="timer-label">{props.mode}</h2>
      <div id="time-left">{props.session_length}:00</div>
      <div className="wrapper">
        <button id="start_stop">
          <i className="fas fa-play" /> Start
        </button>
        <button id="reset" onClick={props.reset}>
          <i className="fas fa-sync-alt" /> Reset
        </button>
      </div>
    </React.Fragment>
  );
}

export default Timer;
