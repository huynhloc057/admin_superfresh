import React from "react";
import CheckConnection from "../HOC/CheckConnection";

const HomePage = () => {
  return (
    <CheckConnection>
      <div>Day la Home Screen</div>;
    </CheckConnection>
  );
};

export default HomePage;
