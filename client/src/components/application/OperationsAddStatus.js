import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

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

    console.log(this.props.log._id, statusData);

    this.props.addStatus(this.props.log._id, statusData);
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
  { addStatus }
)(OperationsAddStatus);
