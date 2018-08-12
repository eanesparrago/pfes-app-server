import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";

import {
  getDomesticLogs,
  getInternationalLogs
} from "../../actions/logsActions";

class ApplicationNav extends Component {
  constructor() {
    super();
    this.state = {
      active: "/app/logs"
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getDomesticLogs();
    this.props.getInternationalLogs();
  }

  componentWillMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    } else {
      if (
        this.props.location.pathname === "/app" ||
        this.props.location.pathname === "/app/"
      ) {
        this.setState({ active: "/app/logs" });
      } else {
        this.setState({ active: this.props.location.pathname });
      }
    }
  }

  componentWillUnmount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/app");
    }
  }

  handleClick(item) {
    this.setState({ active: item });
  }

  render() {
    const { auth } = this.props;

    return (
      <div className="container-fluid">
        <h3 className="mb-3">
          <em>Hello {auth.user.firstName}! SAWADIKA!!!</em>
        </h3>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link
              className={classnames("nav-link", {
                active: this.state.active === "/app/logs"
              })}
              to="/app/logs"
              onClick={() => this.handleClick("/app/logs")}
            >
              Logs
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={classnames("nav-link", {
                active: this.state.active === "/app/calendar"
              })}
              to="/app/calendar"
              onClick={() => this.handleClick("/app/calendar")}
            >
              Calendar
            </Link>
          </li>

          {auth.user.userType === "admin" ? (
            <li className="nav-item">
              <Link
                className={classnames("nav-link", {
                  active: this.state.active === "/app/users"
                })}
                to="/app/users"
                onClick={() => this.handleClick("/app/users")}
              >
                Users
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getDomesticLogs, getInternationalLogs }
)(ApplicationNav);
