import React from "react";

function Button({ id, onClick, children, icon }) {
  return (
    <button id={id} onClick={onClick}>
      {icon} {children}
    </button>
  );
}

export default Button;
