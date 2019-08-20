import React from "react";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

function Settings({ label, mode, length, increment, decrement }) {
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
          <FaArrowCircleUp className="fas fa-arrow-circle-up" />
        </span>
        <p>
          <span id={`${mode}-length`}>{length}</span> min
        </p>
        <span
          id={`${mode}-decrement`}
          onClick={() => {
            decrement(mode);
          }}
        >
          <FaArrowCircleDown className="fas fa-arrow-circle-down" />
        </span>
      </div>
    </div>
  );
}

export default Settings;
