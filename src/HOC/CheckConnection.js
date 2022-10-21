import React from "react";
import { Detector } from "react-detect-offline";

const CheckConnection = (props) => {
  return (
    <>
      <Detector
        render={({ online }) =>
          online ? (
            props.children
          ) : (
            <div style={{ paddingTop: "10px", textAlign: "center" }}>
              <h1>No connection</h1>
              <h4>Please check your internet connection!</h4>
            </div>
          )
        }
      />
    </>
  );
};

export default CheckConnection;
