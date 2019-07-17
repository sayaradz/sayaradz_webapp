import React from "react";
import loader from "./loader.gif";

export default () => {
  return (
    <div>
      <img
        src={loader}
        style={{ width: "500px", marginLeft: "300px", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};
