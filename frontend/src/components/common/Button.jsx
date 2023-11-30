import React from 'react';

const Button = ({ onClick, children, className = "", type = "button" }) => {
  const buttonClasses = `bg-blue-500 text-white font-bold py-2 px-4 rounded ${className}`;

  return (
    <button type={type} className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
