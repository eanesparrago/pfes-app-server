import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import moment from "moment";

import generateBadge from "../../utils/generateBadge";

import logo from "../../img/pfes-logo.png";

import Weather from "./weather/Weather";
import ClocksContainer from "./clocks/ClocksContainer";

import {
  getDomesticLogs,
  getInternationalLogs
} from "../../actions/logsActions";

import { getWeather } from "../../actions/authActions";

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

    this.props.getWeather();
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

    const badge = generateBadge(auth.user.userType);

    return (
      <div className="container-fluid">
        <div className="card mb-3 shadow-sm pfes-header">
          <div className="card-body row">
            <div className="col-md-4">
              <div className="pfes-header-info">
                <div>
                  <img
                    className="pfes-header-logo"
                    src={logo}
                    alt="PFES Logo"
                  />
                </div>

                <div className="pfes-header-text">
                  <div className="pfes-header-name">
                    <h3 className="">
                      {auth.user.firstName} {badge}
                    </h3>
                  </div>

                  <div className="pfes-header-date">
                    <span>Today is {moment().format("MMM DD, YYYY")}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <Weather />
            </div>

            <div className="col-md-4">
              <ClocksContainer />
            </div>
          </div>
        </div>

        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link
              className={classnames("nav-link", {
                active: this.state.active === "/app/logs"
              })}
              to="/app/logs"
              onClick={() => this.handleClick("/app/logs")}
            >
              <i className="fas fa-book" />{" "}
              <span className="d-none d-sm-inline">Logs</span>
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
              <i className="far fa-calendar-alt" />{" "}
              <span className="d-none d-sm-inline">Calendar</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={classnames("nav-link", {
                active: this.state.active === "/app/statistics"
              })}
              to="/app/statistics"
              onClick={() => this.handleClick("/app/statistics")}
            >
              <i className="fas fa-chart-bar" />{" "}
              <span className="d-none d-sm-inline">Statistics</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={classnames("nav-link", {
                active: this.state.active === "/app/activity"
              })}
              to="/app/activity"
              onClick={() => this.handleClick("/app/activity")}
            >
              <i className="fas fa-list" />{" "}
              <span className="d-none d-sm-inline">Activity</span>
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
                <i className="fas fa-users" />{" "}
                <span className="d-none d-sm-inline">Users</span>
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
  { getDomesticLogs, getInternationalLogs, getWeather }
)(ApplicationNav);
