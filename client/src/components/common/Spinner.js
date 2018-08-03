import React from "react";
import spinner from "./spinner.gif";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading spinner"
        style={{ margin: "auto", display: "block" }}
      />
    </div>
  );
};
