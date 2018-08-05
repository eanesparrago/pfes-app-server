import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import Moment from "react-moment";

import { clearErrors } from "../../actions/logsActions";

import { addStatus } from "../../actions/logsActions";

class OperationsAddStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: "",
      dateInput: ""
    };

    this.onChange = this.onChange.bind(this);
    this.submitStatus = this.submitStatus.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.log) {
      this.setState({ comment: "", dateInput: "" });
    }
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitStatus(e) {
    e.preventDefault();

    const statusData = {
      comment: this.state.comment,
      dateInput: this.state.dateInput,
      stage: this.props.stage
    };

    this.props.addStatus(this.props.log, statusData);
  }

  render() {
    const { errors, stage } = this.props;

    return (
      <form noValidate onSubmit={this.submitStatus}>
        <div className="row">
          <div className="form-group col-lg-5">
            <input
              type="text"
              className={classnames("form-control form-control-sm", {
                "is-invalid": errors.comment
              })}
              placeholder="Status"
              name="comment"
              value={this.state.comment}
              onChange={this.onChange}
            />
            <small className="form-text text-muted ml-2">Required</small>
            {errors.comment && (
              <div className="invalid-feedback">{errors.comment}</div>
            )}
          </div>

          <div className="form-group col-lg-5">
            <input
              type="date"
              className={classnames("form-control form-control-sm", {})}
              name="dateInput"
              value={this.state.dateInput}
              onChange={this.onChange}
            />
            <small className="form-text text-muted ml-2">
              Defaults to today (<Moment format="YYYY-MM-DD">
                {Date.now()}
              </Moment>)
            </small>
          </div>

          <div className="form-group col-lg-2">
            <button className="btn btn-primary btn-sm">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  log: state.log.log
});

export default connect(
  mapStateToProps,
  { addStatus, clearErrors }
)(OperationsAddStatus);
