import React, { Component } from "react";
import PropTypes from "prop-types";

import DomesticLogs from "./DomesticLogs";
import InternationalLogs from "./InternationalLogs";

class Logs extends Component {
  render() {
    return (
      <div className="mx-3 mt-2">
        <DomesticLogs />
        <InternationalLogs />
      </div>
    );
  }
}

export default Logs;
