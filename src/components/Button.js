import React from 'react';

function Button({id, onClick, iconClass, children}){
  return(
    <button 
      id={id} 
      onClick={onClick}>
      <i className={iconClass}/> {children}
    </button>
  )
}

export default Button;