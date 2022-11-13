import React from "react";
import CheckConnection from "../HOC/CheckConnection";

const HomePage = () => {
  return (
    <CheckConnection>
      <div class="d-flex flex-column align-items-center justify-content-center vh-100 bg-success">
        <h1 class="display-1 fw-bold text-white">Super Freshshop ADMIN !</h1>
      </div>
    </CheckConnection>
  );
};

export default HomePage;
