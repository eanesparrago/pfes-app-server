import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import moment from "moment";

import LogViewEdit from "./LogViewEdit";
import Operations from "./Operations";

class LogView extends Component {
  render() {
    const { log } = this.props;

    //  This is required because you can't slice undefined
    log.type ? (log.type = log.type) : (log.type = "-");

    return (
      <div
        className="modal fade"
        id="LogView"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title mt-1" id="exampleModalLabel">
                {log.type.slice(0, 1)}-{log.domJo}
              </h5>

              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* //////////// FORM //////////// */}
              <LogViewEdit />

              <div className="dropdown-divider" />

              {/* //////////// OPERATIONS //////////// */}
              <Operations />
            </div>

            <div className="modal-footer">
              <div className="mr-3">
                <small
                  title={moment(log.date).format("MMMM Do YYYY, h:mm:ssa")}
                >
                  <em>
                    Date&nbsp;added:&nbsp;<Moment format="MM/DD/YYYY">
                      {log.date}
                    </Moment>,
                  </em>
                </small>{" "}
                <small
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
  log: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  log: state.log.log,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(LogView);
