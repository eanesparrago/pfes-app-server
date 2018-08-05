import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import Moment from "react-moment";

import { submitComplete, clearErrors } from "../../actions/logsActions";

class OperationsCompleteForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      remarks: "",
      // dateFinished: ""
    };

    this.onChange = this.onChange.bind(this);
    this.submitComplete = this.submitComplete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.log) {
      this.setState({ remarks: "", dateFinished: "" });
    }
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitComplete(e) {
    e.preventDefault();

    const statusData = {
      isFinished: true,
      remarks: this.state.remarks,
      // dateFinished: this.state.dateFinished,
      stage: this.props.stage
    };

    this.props.submitComplete(this.props.log, statusData);
  }

  render() {
    const { errors, stage } = this.props;

    return (
      <form noValidate onSubmit={this.submitComplete}>
        <div className="row">
          <div className="form-group col-lg-10">
            <input
              type="text"
              className={classnames("form-control form-control-sm", {
                "is-invalid": errors.remark
              })}
              placeholder="Completion remarks"
              name="remarks"
              value={this.state.remarks}
              onChange={this.onChange}
            />
            <small className="form-text text-muted ml-2">Optional</small>
          </div>

          {/* <div className="form-group col-lg-5">
            <input
              type="date"
              className={classnames("form-control form-control-sm", {
                "is-invalid": errors.dateFinished
              })}
              name="dateFinished"
              value={this.state.dateFinished}
              onChange={this.onChange}
            />
            <small className="form-text text-muted ml-2">
              Defaults to today (<Moment format="MM/DD/YYYY">
                {Date.now()}
              </Moment>)
            </small>
          </div> */}

          <div className="form-group col-lg-2">
            <button className="btn btn-success btn-sm">Submit</button>
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
  { submitComplete, clearErrors }
)(OperationsCompleteForm);
