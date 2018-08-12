import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import DomesticLogs from "./DomesticLogs";
import InternationalLogs from "./InternationalLogs";
import LogView from "./LogView";
import Spinner from "../common/Spinner";

class Logs extends Component {
  render() {
    const { log } = this.props;

    let domesticContent;
    let internationalContent;

    // Show spinner if either domestic and international aren't fetched yet
    if (log.domestic === null || log.international === null || log.loading) {
      domesticContent = <Spinner />;
    } else {
      domesticContent = <DomesticLogs logs={log.domestic} />;
      internationalContent = <InternationalLogs logs={log.international} />;
    }

    return (
      <div className="mx-3 mt-2">
        {domesticContent}
        {internationalContent}
        <LogView />
      </div>
    );
  }
}

Logs.propTypes = {
  log: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  log: state.log
});

export default connect(mapStateToProps)(Logs);
