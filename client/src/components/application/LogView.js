import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import moment from "moment";
import $ from "jquery";

import LogViewEdit from "./LogViewEdit";
import Operations from "./Operations";

import { clearAlert } from "../../actions/alertActions";

class LogView extends Component {
  constructor(props) {
    super(props);

    this.close = this.close.bind(this);
  }

  close() {
    this.props.clearAlert();

    $("#editBack").click();
  }

  render() {
    const { log } = this.props;

    //  This is required because you can't slice undefined
    log.type ? (log.type = log.type) : (log.type = "-");

    return (
      <div
        className="modal fade-in-2"
        id="LogView"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div className="modal-dialog modal-lg" role="dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title mt-1" id="exampleModalLabel">
                {log.type} Job Order #{log.domJo}
              </h5>

              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" onClick={this.close}>
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body">
              {/* //////////// FORM //////////// */}
              <LogViewEdit onRef={ref => (this.child = ref)} />

              {/* //////////// OPERATIONS //////////// */}
              <React.Fragment>
                <div className="dropdown-divider" />

                <Operations />
              </React.Fragment>
            </div>

            <div className="modal-footer">
              <div className="mr-3">
                <small
                  className="text-nowrap"
                  title={moment(log.date).format("MMMM Do YYYY, h:mm:ssa")}
                >
                  <em>
                    Date&nbsp;added:&nbsp;
                    <Moment format="MM/DD/YYYY">{log.date}</Moment>,
                  </em>
                </small>{" "}
                <small
                  className="text-nowrap"
                  title={moment(log.dateModified).format(
                    "MMMM Do YYYY, h:mm:ssa"
                  )}
                >
                  <em>
                    Date&nbsp;modified:&nbsp;
                    {log.dateModified ? (
                      <Moment format="MM/DD/YYYY">{log.dateModified}</Moment>
                    ) : (
                      " n/a"
                    )}
                  </em>
                </small>
              </div>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.close}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LogView.propTypes = {
  clearAlert: PropTypes.func.isRequired,
  log: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  log: state.log.log,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { clearAlert }
)(LogView);
