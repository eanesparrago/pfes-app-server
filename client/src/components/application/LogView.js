import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";

import LogViewEdit from "./LogViewEdit";
import Operations from "./Operations";

class LogView extends Component {
  constructor() {
    super();
  }

  render() {
    const { log } = this.props;

    //  This is required because you can't slice undefined
    log.type ? (log.type = log.type) : (log.type = "default");
    log.date ? (log.date = log.date) : (log.date = "default");

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
              <h5 className="modal-title mr-3 mt-1" id="exampleModalLabel">
                {log.type.slice(0, 1)}-{log.domJo}{"  "}
                <small>
                  <em> Date added: {log.date.slice(0, 10)}</em>
                </small>
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
            </div>

            <Operations />
            <div className="modal-footer">
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

const mapStateToProps = state => ({
  log: state.log,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(LogView);
