import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import LogViewEdit from "./LogViewEdit";
import Operations from "./Operations";

class LogView extends Component {
  render() {
    const { log } = this.props;

    //  This is required because you can't slice undefined
    log.type ? (log.type = log.type) : (log.type = "-");
    log.date ? (log.date = log.date) : (log.date = "-");
    log.dateModified
      ? (log.dateModified = log.dateModified)
      : (log.dateModified = "-");

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
              <LogViewEdit log={log} />

              <div className="dropdown-divider" />

              {/* //////////// OPERATIONS //////////// */}
              <Operations />
            </div>

            <div className="modal-footer">
              <div className="mr-3">
                <small>
                  <em>
                    Date&nbsp;added:&nbsp;{log.date.slice(0, 10)},
                    Date&nbsp;modified:&nbsp;{log.dateModified.slice(0, 10)}
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
