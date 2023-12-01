import React from "react";

const Header = ({ children }) => {
    const headingClasses = `m-2 text-xl font-bold text-black-500`;

    return (
        <h1 className={headingClasses}>{children}</h1>
    )
}

export default Header