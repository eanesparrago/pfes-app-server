import React from "react";
import spinner from "./spinner-small.gif";

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
