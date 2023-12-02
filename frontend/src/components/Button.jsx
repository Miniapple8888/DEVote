import React from 'react';

const Button = ({ onClick, children, className = "", type = "button" }) => {
  const buttonClasses = `bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all ${className}`;

  return (
    <button 
// @ts-ignore
    type={type} className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
