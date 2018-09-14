import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import { clearErrors } from "../../actions/logsActions";

import { addStatus } from "../../actions/logsActions";

class OperationsAddStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: "",
      type: "Info",

      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.submitStatus = this.submitStatus.bind(this);
    this.changeType = this.changeType.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.log.log) {
      this.setState({ comment: "", dateInput: "" });
    }
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  changeType(type) {
    this.setState({ type: type });
  }

  submitStatus(e) {
    e.preventDefault();

    const { log } = this.props.log;

    const statusData = {
      comment: this.state.comment,
      type: this.state.type,
      stage: this.props.stage
    };

    this.props.addStatus(log, statusData);
  }

  render() {
    const { errors } = this.state;
    const { submitInProgress } = this.props.log;

    return (
      <form className="fade-in" noValidate onSubmit={this.submitStatus}>
        <fieldset disabled={submitInProgress ? true : false}>
          <div className="row">
            <div className="input-group input-group-sm mb-3 col-lg-12">
              <div className="input-group-prepend">
                <button
                  className={classnames("btn dropdown-toggle", {
                    "btn-info": this.state.type === "Info",
                    "btn-danger": this.state.type === "Problem"
                  })}
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {this.state.type}
                </button>
                <div className="dropdown-menu">
                  <a
                    className="dropdown-item"
                    onClick={() => this.changeType("Info")}
                  >
                    Info
                  </a>

                  <a
                    className="dropdown-item"
                    onClick={() => this.changeType("Problem")}
                  >
                    Problem
                  </a>
                </div>
              </div>

              <input
                type="text"
                className={classnames("form-control", {
                  "is-invalid": errors.comment
                })}
                aria-label="Text input with dropdown button"
                placeholder="Status (Required)"
                name="comment"
                value={this.state.comment}
                onChange={this.onChange}
              />

              <div className="input-group-append">
                <button className="btn btn-primary btn-sm">Submit</button>
              </div>

              {errors.comment ? (
                <div className="d-block invalid-feedback">{errors.comment}</div>
              ) : null}
            </div>
          </div>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  log: state.log
});

export default connect(
  mapStateToProps,
  { addStatus, clearErrors }
)(OperationsAddStatus);
