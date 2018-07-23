import React, { Component } from "react";
import "./Application.css";
import { withRouter } from "react-router-dom";

import ApplicationNav from "./ApplicationNav";


export class Application extends Component {
  render() {
    return (
      <div className="Application">
        <ApplicationNav />
      </div>
    );
  }
}

export default withRouter(Application);
