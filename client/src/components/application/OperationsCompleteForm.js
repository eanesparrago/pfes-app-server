import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import { submitComplete, clearErrors } from "../../actions/logsActions";

class OperationsCompleteForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      remarks: ""
    };

    this.onChange = this.onChange.bind(this);
    this.submitComplete = this.submitComplete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.log.log) {
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

    const { log } = this.props.log;

    const statusData = {
      isFinished: true,
      remarks: this.state.remarks,
      stage: this.props.stage
    };

    if (this.props.stage === "unloading") {
      if (
        window.confirm(
          "Are you sure unloading is complete? This action cannot be undone."
        )
      ) {
        this.props.submitComplete(log, statusData);
      }
    } else {
      this.props.submitComplete(log, statusData);
    }
  }

  render() {
    const { errors } = this.props;
    const { submitInProgress } = this.props.log;

    return (
      <form className="fade-in" noValidate onSubmit={this.submitComplete}>
        <fieldset disabled={submitInProgress ? true : false}>
          <div className="row">
            <div className="input-group input-group-sm mb-3 col-lg-12">
              <input
                type="text"
                className={classnames("form-control", {
                  "is-invalid": errors.remark
                })}
                aria-label="Text input with dropdown button"
                placeholder="Completion remarks (Optional)"
                name="remarks"
                value={this.state.remarks}
                onChange={this.onChange}
              />

              <div className="input-group-append">
                <button className="btn btn-success btn-sm">Submit</button>
              </div>
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
  { submitComplete, clearErrors }
)(OperationsCompleteForm);
