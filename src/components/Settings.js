import React from "react";

function Settings({label, mode, length, increment, decrement}) {
  return (
    <div className="time-adjust-wrapper">
      <h3 id={`${mode}-label`}>{label} Length</h3>
      <div className="adjust-time">
        <span
          id={`${mode}-increment`}
          onClick={() => {
            increment(mode);
          }}
        >
          <i className="fas fa-arrow-circle-up" />
        </span>
        <p>
          <span id={`${mode}-length`}> {length} </span> min
        </p>
        <span
          id={`${mode}-decrement`}
          onClick={() => {
            decrement(mode);
          }}
        >
          <i className="fas fa-arrow-circle-down" />
        </span>
      </div>
    </div>
  );
}

export default Settings;
