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
    const stage = { stage: this.props.stage };

    this.props.deleteStatus(this.props.log, id, stage);
  }

  deleteComplete() {
    const statusData = {
      isFinished: false,
      stage: this.props.stage
    };

    this.props.deleteComplete(this.props.log, statusData);
  }

  render() {
    const { statusControl, markCompleteControl } = this.state;

    const { data, title, stage, auth, log } = this.props;
    // data contains isFinished, remarks, dateFinshed, and statuses

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
            className="list-child-reverse list-group-item d-flex justify-content-between align-items-center row"
          >
            <div className="list-comment col-lg-8">
              {status.comment}{" "}
              <span className="text-muted">
                <em>&mdash; {status.name}</em>
              </span>
            </div>
            <div className="col-lg-2">
              <Moment format="MM/DD/YYYY, h:mm:ssa">{status.date}</Moment>
            </div>

            <div className="col-lg-2">
              {showControls === true ? (
                <span>
                  <button
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
      <li className="list-group-item pb-1">
        <div className="row mb-2">
          <h4 className="col-lg-2">
            <div>{title}</div>
          </h4>

          {showControls === true ? (
            <div className="col-lg-10">
              <div>
                <button
                  type="button"
                  className={classnames("btn btn-sm mr-2 mb-1", {
                    "btn-secondary": statusControl === true,
                    "btn-outline-secondary": statusControl === false
                  })}
                  onClick={this.toggleStatusControl}
                >
                  Add Status
                </button>
                <button
                  type="button"
                  className={classnames("btn btn-sm mr-2 mb-1", {
                    "btn-success": markCompleteControl === true,
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
        {showControls === true && statusControl === true ? (
          <OperationsAddStatus data={data} stage={stage} />
        ) : null}

        {/* Mark as Complete Form */}
        {showControls === true && markCompleteControl === true ? (
          <OperationsCompleteForm stage={stage} />
        ) : null}

        <div className="container">
          <ul className="list-parent-reverse list-group list-group-flush">
            {/* When the stage is complete, the Completed status is shown*/}
            {data.isFinished === true ? (
              <li className="list-child-reverse list-group-item list-group-item-success d-flex justify-content-between align-items-center row">
                <div className="col-lg-8">
                  <strong className="">Completed</strong> | Remarks:{" "}
                  {data.remarks}{" "}
                  <span className="text-muted">
                    <em>&mdash; {data.name}</em>
                  </span>
                </div>

                {/* Undo complete button */}
                <div className="col-lg-2">
                  <Moment format="MM/DD/YYYY, h:mm:ssa">
                    {data.dateFinished}
                  </Moment>
                </div>

                <div className="col-lg-2">
                  {auth.user.userType === "admin" ||
                  auth.user.userType === "operations" ? (
                    <button
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
  log: state.log.log,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteStatus, deleteComplete }
)(OperationsStage);
