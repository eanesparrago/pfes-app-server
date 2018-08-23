import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";

import { clearAlert } from "../../actions/alertActions";

class AlertBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      success: false,
      message: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.alert) {
      const { show, success, message } = nextProps.alert;
      this.setState({ show: show, success: success, message: message });
    }
  }

  render() {
    const { show, success, message } = this.state;

    let alert = null;

    if (show === true) {
      alert = (
        <div
          className={classnames("alert alert-dismissible fade show", {
            "alert-success": success === true,
            "alert-danger": success === false
          })}
          role="alert"
        >
          {message}
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={this.props.clearAlert}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }

    return <div>{alert}</div>;
  }
}

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(
  mapStateToProps,
  { clearAlert }
)(AlertBox);
