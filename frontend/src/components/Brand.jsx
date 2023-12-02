import React from "react";
import { useNavigate } from "react-router-dom";

const Brand = () => {
  const navigate = useNavigate();

  const dashboard = () => {
    navigate("/dashboard");
  };

  return (
    <a onClick={dashboard}>
      <h1 className="text-4xl font-bold text-blue-500 hover:cursor-pointer">
        DEVote
      </h1>
    </a>
  );
};

export default Brand;
