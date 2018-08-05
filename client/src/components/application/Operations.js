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

  submitEdit() {
    console.log("STATE", this.state);
  }

  render() {
    const { errors, isEditable } = this.state;
    const { log, auth } = this.props;

    let controls = null;

    if (auth.user.userType === "admin" || auth.user.userType === "operations") {
      {
        controls = isEditable ? (
          <button
            type="button"
            className="btn btn-primary btn-sm mr-2 mb-3"
            onClick={this.submitEdit}
          >
            Confirm
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-outline-primary btn-sm mr-2 mb-3"
            onClick={this.toggleEdit}
          >
            Add Status
          </button>
        );
      }
    }

    return (
      <div className="mt-3">
        <div className="container row">
          <h2 className="mr-3">Status</h2>
        </div>

        <OperationsStage
          title="Preloading"
          stage="preloading"
          data={log.operations.preloading}
        />

        {log.operations.preloading.isFinished === true ? (
          <OperationsStage
            title="Loading"
            stage="loading"
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

const mapStateToProps = state => ({
  auth: state.auth,
  log: state.log.log,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editLog, getDomesticLogs, getInternationalLogs }
)(Operations);
