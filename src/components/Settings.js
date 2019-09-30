import React from "react";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

function Settings({ mode, length, handleIncrement, handleDecrement }) {
  return (
    <div className="time-adjust-wrapper">
      <h3 id={`${mode}-label`}>{mode}</h3>
      <div className="adjust-time">
        <span
          id={`${mode}-increment`}
          onClick={() => {
            handleIncrement(mode);
          }}
        >
          <FaArrowCircleUp className="fas fa-arrow-circle-up" />
        </span>
        <p>
          <span id={`${mode}-length`}>{Math.floor(length / 60)}</span> min
        </p>
        <span
          id={`${mode}-decrement`}
          onClick={() => {
            handleDecrement(mode);
          }}
        >
          <FaArrowCircleDown className="fas fa-arrow-circle-down" />
        </span>
      </div>
    </div>
  );
}

export default Settings;
