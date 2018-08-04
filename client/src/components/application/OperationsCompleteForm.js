import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

class OperationsCompleteForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      remarks: "",
      dateFinished: ""
    };

    this.onChange = this.onChange.bind(this);
    this.submitStatus = this.submitStatus.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitStatus(e) {
    e.preventDefault();

    console.log(this.state);
    console.log(this.props.stage);
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
                "is-invalid": errors.domJo
              })}
              placeholder="Completion remarks"
              name="remarks"
              value={this.state.remarks}
              onChange={this.onChange}
            />
            {errors.domJo && (
              <div className="invalid-feedback">{errors.domJo}</div>
            )}
          </div>

          <div className="form-group col-lg-5">
            <input
              type="date"
              className={classnames("form-control form-control-sm", {
                "is-invalid": errors.domJo
              })}
              name="dateFinished"
              value={this.state.dateFinished}
              onChange={this.onChange}
            />
            {errors.domJo && (
              <div className="invalid-feedback">{errors.domJo}</div>
            )}
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
  errors: state.errors
});

export default connect(mapStateToProps)(OperationsCompleteForm);
