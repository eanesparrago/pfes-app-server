import React, { Component } from "react";
import classnames from "classnames";
import isEmpty from "../../validation/is-empty";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteStatus } from "../../actions/logsActions";

import OperationsAddStatus from "./OperationsAddStatus";
import OperationsCompleteForm from "./OperationsCompleteForm";

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

  render() {
    const { statusControl, markCompleteControl } = this.state;

    const { data, title, stage, auth } = this.props;

    // Show controls only to admin and operations
    let showControls = false;
    if (auth.user.userType === "admin" || auth.user.userType === "operations") {
      showControls = true;
    }

    let statusList;

    if (isEmpty(data.statuses)) {
      statusList = (
        <p>
          <em>No status</em>
        </p>
      );
    } else {
      statusList = data.statuses.map(status => {
        return (
          <li
            key={status._id}
            className="list-group-item d-flex justify-content-between align-items-center row"
          >
            <div className="col-lg-6">{status.comment}</div>
            <div className="col-lg-4">
              <Moment format="YYYY-MM-DD">{status.dateInput}</Moment>
            </div>

            {showControls === true ? (
              <div className="col-lg-2">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm mr-2"
                  // onClick={this.toggleEdit}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => this.deleteStatus(status._id)}
                >
                  &times;
                </button>
              </div>
            ) : null}
          </li>
        );
      });
    }

    return (
      <li className="list-group-item pb-1">
        <div className="row mb-2">
          <h4 className="col-lg-3">
            <div>{title}</div>
          </h4>

          {showControls === true ? (
            <div className="col-lg-7">
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
          <ul className="list-group list-group-flush">{statusList}</ul>
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
  { deleteStatus }
)(OperationsStage);
