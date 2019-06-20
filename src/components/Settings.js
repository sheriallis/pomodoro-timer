import React from "react";

function Settings(props) {
  return (
    <div className="time-adjust-wrapper">
      <h3 id={`${props.mode}-label`}>{props.label} Length</h3>
      <div className="adjust-time">
        <span
          id={`${props.mode}-increment`}
          onClick={() => {
            props.increment(props.mode);
          }}
        >
          <i className="fas fa-arrow-circle-up" />
        </span>
        <p>
          <span id={`${props.mode}-length`}> {props.length} </span> min
        </p>
        <span
          id={`${props.mode}-decrement`}
          onClick={() => {
            props.decrement(props.mode);
          }}
        >
          <i className="fas fa-arrow-circle-down" />
        </span>
      </div>
    </div>
  );
}

export default Settings;
