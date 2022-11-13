import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div class="d-flex flex-column align-items-center justify-content-center vh-100 bg-warning">
      <h1 class="display-1 fw-bold text-white">Sorry Page Not Found !</h1>

      <Button className="display-1 bg-success" onClick={() => navigate("/")}>
        Back to Home Page
      </Button>
    </div>
  );
};

export default PageNotFound;
