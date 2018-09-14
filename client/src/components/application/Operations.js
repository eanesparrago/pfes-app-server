import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import OperationsStage from "./OperationsStage";

import {
  editLog,
  getDomesticLogs,
  getInternationalLogs
} from "../../actions/logsActions";

class Operations extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      isEditable: false
    };

    this.onChange = this.onChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleEdit() {
    this.setState({
      isEditable: !this.state.isEditable
    });
  }

  render() {
    const { log } = this.props;

    return (
      <div className="mt-3">
        <div className="container row">
          <h2 className="mr-3">Status</h2>
        </div>

        <OperationsStage
          title="Preloading"
          stage="preloading"
          isSucceedingFinished={log.operations.loading.isFinished}
          data={log.operations.preloading}
        />

        {log.operations.preloading.isFinished === true ? (
          <OperationsStage
            title="Loading"
            stage="loading"
            isSucceedingFinished={log.operations.unloading.isFinished}
            data={log.operations.loading}
          />
        ) : null}

        {log.operations.preloading.isFinished === true &&
        log.operations.loading.isFinished === true ? (
          <OperationsStage
            title="Unloading"
            stage="unloading"
            data={log.operations.unloading}
          />
        ) : null}
      </div>
    );
  }
}

Operations.propTypes = {
  auth: PropTypes.object.isRequired,
  log: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  log: state.log.log
});

export default connect(
  mapStateToProps,
  { editLog, getDomesticLogs, getInternationalLogs }
)(Operations);
