import React, { Component } from "react";
import classnames from "classnames";
import isEmpty from "../../validation/is-empty";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteStatus, deleteComplete } from "../../actions/logsActions";

import OperationsAddStatus from "./OperationsAddStatus";
import OperationsCompleteForm from "./OperationsCompleteForm";

import "./OperationsStage.css";

class OperationsStage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statusControl: false,
      markCompleteControl: false
    };

    this.toggleStatusControl = this.toggleStatusControl.bind(this);
    this.toggleMarkCompleteControl = this.toggleMarkCompleteControl.bind(this);
    this.deleteStatus = this.deleteStatus.bind(this);
    this.deleteComplete = this.deleteComplete.bind(this);
  }

  toggleStatusControl() {
    this.setState({
      statusControl: !this.state.statusControl,
      markCompleteControl: false
    });
  }

  toggleMarkCompleteControl() {
    this.setState({
      markCompleteControl: !this.state.markCompleteControl,
      statusControl: false
    });
  }

  deleteStatus(id) {
    const { log } = this.props.log;

    const stage = { stage: this.props.stage };

    this.props.deleteStatus(log, id, stage);
  }

  deleteComplete() {
    const { log } = this.props.log;

    const statusData = {
      isFinished: false,
      stage: this.props.stage
    };

    this.props.deleteComplete(log, statusData);
  }

  render() {
    const { statusControl, markCompleteControl } = this.state;

    const { data, title, stage, auth, isSucceedingFinished } = this.props;
    // data contains isFinished, remarks, dateFinshed, and statuses

    const { log, submitInProgress } = this.props.log;

    // Show controls only to either admin or operations and isFinished must be false
    let showControls = false;
    if (
      (auth.user.userType === "admin" || auth.user.userType === "operations") &&
      data.isFinished === false
    ) {
      showControls = true;
    }

    let statusList;

    const statuses = data.statuses;

    // Map status array
    if (isEmpty(data.statuses) && data.isFinished === false) {
      statusList = (
        <li className="list-group-item d-flex justify-content-between align-items-center row">
          <em>No status</em>
        </li>
      );
    } else {
      statusList = statuses.map(status => {
        return (
          <li
            key={status._id}
            className="fade-in list-child-reverse list-group-item d-flex justify-content-between align-items-center row"
          >
            <div className="list-comment col-lg-8">
              <span
                className={classnames("", {
                  "text-info": status.type === "Info",
                  "text-warning": status.type === "Warning",
                  "text-danger": status.type === "Problem"
                })}
              >
                {status.type}:{" "}
              </span>
              {status.comment}
              <span className="text-muted">
                <em> &mdash; {status.name}</em>
              </span>
            </div>
            <div className="col-lg-2">
              <Moment format="MM/DD/YYYY, h:mm:ssa">{status.date}</Moment>
            </div>

            <div className="col-lg-2 list-controls">
              {(auth.user.userType === "admin" ||
                status.user === auth.user.id) &&
              showControls === true &&
              !log.isCompleted ? (
                <span>
                  <button
                    disabled={submitInProgress ? true : false}
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => this.deleteStatus(status._id)}
                  >
                    Delete
                  </button>
                </span>
              ) : null}
            </div>
          </li>
        );
      });
    }

    return (
      <li className="fade-in list-group-item pb-1">
        <div className="row mb-2">
          <h4 className="col-lg-2">
            <div>{title}</div>
          </h4>

          {log.status === "Ongoing" &&
          !log.isCompleted &&
          showControls === true ? (
            <div className="col-lg-10">
              <div>
                <button
                  type="button"
                  className={classnames("btn btn-sm mr-2 mb-1", {
                    "btn-primary active": statusControl === true,
                    "btn-outline-primary": statusControl === false
                  })}
                  onClick={this.toggleStatusControl}
                >
                  Add Status
                </button>
                <button
                  type="button"
                  className={classnames("btn btn-sm mr-2 mb-1", {
                    "btn-success active": markCompleteControl === true,
                    "btn-outline-success": markCompleteControl === false
                  })}
                  onClick={this.toggleMarkCompleteControl}
                >
                  Mark as Complete
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {/* Add Status Form */}
        {log.status === "Ongoing" &&
        !log.isCompleted &&
        showControls === true &&
        statusControl === true ? (
          <OperationsAddStatus data={data} stage={stage} />
        ) : null}

        {/* Mark as Complete Form */}
        {log.status === "Ongoing" &&
        !log.isCompleted &&
        showControls === true &&
        markCompleteControl === true ? (
          <OperationsCompleteForm stage={stage} />
        ) : null}

        <div className="container">
          <ul className="list-parent-reverse list-group list-group-flush">
            {/* When the stage is complete, the Completed status is shown*/}
            {data.isFinished === true ? (
              <li className="fade-in list-child-reverse list-group-item list-group-item-success d-flex justify-content-between align-items-center row">
                <div className="col-lg-8">
                  <strong className="">Completed</strong> | Remarks:{" "}
                  {data.remarks}{" "}
                  <span className="text-muted">
                    <em>&mdash; {data.name}</em>
                  </span>
                </div>

                <div className="col-lg-2">
                  <Moment format="MM/DD/YYYY, h:mm:ssa">
                    {data.dateFinished}
                  </Moment>
                </div>

                {/* Undo complete button */}
                <div className="col-lg-2">
                  {log.status === "Ongoing" &&
                  !log.isCompleted &&
                  !isSucceedingFinished &&
                  stage !== "unloading" &&
                  (auth.user.userType === "admin" ||
                    auth.user.userType === "operations") ? (
                    <button
                      disabled={submitInProgress ? true : false}
                      className="btn btn-outline-danger btn-sm"
                      onClick={this.deleteComplete}
                    >
                      Undo
                    </button>
                  ) : null}
                </div>
              </li>
            ) : null}

            {/* List of all the statuses */}
            {statusList}
          </ul>
        </div>
      </li>
    );
  }
}

const mapStateToProps = state => ({
  log: state.log,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteStatus, deleteComplete }
)(OperationsStage);
