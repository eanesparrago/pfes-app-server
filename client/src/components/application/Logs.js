import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import DomesticLogs from "./DomesticLogs";
import InternationalLogs from "./InternationalLogs";
import Spinner from "../common/Spinner";

import {
  getDomesticLogs,
  getInternationalLogs
} from "../../actions/logsActions";

import { logoutUser } from "../../actions/authActions";

class Logs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: "all"
    };

    this.navigate = this.navigate.bind(this);
  }

  componentDidMount() {
    if (
      this.props.auth.user.userType === "sales" ||
      this.props.auth.user.userType === "admin"
    ) {
      this.setState({ view: "myLogs" });
    }

    this.props.getDomesticLogs();
    this.props.getInternationalLogs();

    // Logout if token has expired
    const currentTime = Date.now() / 1000;
    if (this.props.auth.user.exp < currentTime) {
      this.props.logoutUser();
    }
  }

  navigate(view) {
    this.setState({ view: view });
  }

  render() {
    const { log, auth } = this.props;
    const { view } = this.state;

    let content = null;
    let contentNav = null;

    let domesticContent;
    let internationalContent;

    // Show spinner if either domestic and international aren't fetched yet
    if (log.domestic === null || log.international === null || log.loading) {
      content = <Spinner />;

      domesticContent = <Spinner />;
    } else {
      let activeDomesticLogs = log.domestic.filter(log => log.active === true);
      let activeInternationalLogs = log.international.filter(
        log => log.active === true
      );

      if (this.state.view === "myLogs") {
        const myDomesticContent = activeDomesticLogs.filter(
          log => log.user === auth.user.id
        );

        const myInternationalContent = activeInternationalLogs.filter(
          log => log.user === auth.user.id
        );

        domesticContent = (
          <DomesticLogs logs={myDomesticContent} view={this.state.view} />
        );
        internationalContent = (
          <InternationalLogs
            logs={myInternationalContent}
            view={this.state.view}
          />
        );
      } else {
        domesticContent = (
          <DomesticLogs logs={activeDomesticLogs} view={this.state.view} />
        );
        internationalContent = (
          <InternationalLogs
            logs={activeInternationalLogs}
            view={this.state.view}
          />
        );
      }

      contentNav = (
        <div className="logs-nav-2 container mb-2">
          <nav className="nav nav-pills nav-justified">
            {auth.user.userType === "sales" ||
            auth.user.userType === "admin" ? (
              <a
                className={classnames("nav-item nav-link text-nowrap", {
                  active: view === "myLogs"
                })}
                href="#myLogs"
                onClick={() => this.navigate("myLogs")}
              >
                <i className="fas fa-user-circle" /> My Job Orders
              </a>
            ) : null}

            <a
              className={classnames("nav-item nav-link text-nowrap", {
                active: view === "all"
              })}
              href="#all"
              onClick={() => this.navigate("all")}
            >
              All Job Orders
            </a>

            <a
              className={classnames("nav-item nav-link text-nowrap", {
                active: view === "domestic"
              })}
              href="#domestic"
              onClick={() => this.navigate("domestic")}
            >
              <i className="fas fa-building" /> Domestic
            </a>

            <a
              className={classnames("nav-item nav-link text-nowrap", {
                active: view === "international"
              })}
              href="#international"
              onClick={() => this.navigate("international")}
            >
              <i className="fas fa-globe-americas" /> International
            </a>
          </nav>
        </div>
      );

      switch (view) {
        case "all":
        case "myLogs":
          content = (
            <div>
              {domesticContent}

              <div className="dropdown-divider mx-3" />

              {internationalContent}
            </div>
          );
          break;

        case "domestic":
          content = <div>{domesticContent}</div>;
          break;

        case "international":
          content = <div>{internationalContent}</div>;
          break;

        default:
          content = (
            <div>
              {domesticContent}
              {internationalContent}
            </div>
          );
      }
    }

    return (
      <div className="fade-in mt-3 mobile-margin">
        {contentNav}

        {content}
      </div>
    );
  }
}

Logs.propTypes = {
  log: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  log: state.log
});

export default connect(
  mapStateToProps,
  { getDomesticLogs, getInternationalLogs, logoutUser }
)(Logs);
