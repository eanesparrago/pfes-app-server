import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";

class LogView extends Component {
  render() {
    // const { errors } = this.state;
    const { log } = this.props;

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
                {log.domJo}
              </h5>
              <button
                type="button"
                className="btn btn-primary"
              >
                Edit Job Order
              </button>

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
              {/* FORM */}
              <form noValidate>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label className="mb-1" htmlFor="domJo">
                      Job order number
                    </label>
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        // "is-invalid": errors.domJo
                      })}
                      placeholder="Job order number"
                      name="domJo"
                      // value={this.state.domJo}
                      // onChange={this.onChange}
                    />
                    {/* {errors.domJo && (
                      <div className="invalid-feedback">{errors.domJo}</div>
                    )} */}
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onSubmit}
              >
                Register User
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  log: state.log
});

export default connect(
  mapStateToProps,
  null
)(LogView);
