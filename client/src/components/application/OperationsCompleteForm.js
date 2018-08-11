import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import { submitComplete, clearErrors } from "../../actions/logsActions";

class OperationsCompleteForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      remarks: ""
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
    const { errors } = this.props;

    return (
      <form className="fade-in" noValidate onSubmit={this.submitComplete}>
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
