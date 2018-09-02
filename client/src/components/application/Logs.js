import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import DomesticLogs from "./DomesticLogs";
import InternationalLogs from "./InternationalLogs";
import Spinner from "../common/Spinner";

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
      if (this.state.view === "myLogs") {
        const myDomesticContent = log.domestic.filter(
          log => log.user === auth.user.id
        );

        const myInternationalContent = log.international.filter(
          log => log.user === auth.user.id
        );

        domesticContent = <DomesticLogs logs={myDomesticContent} />;
        internationalContent = (
          <InternationalLogs logs={myInternationalContent} />
        );
      } else {
        domesticContent = <DomesticLogs logs={log.domestic} />;
        internationalContent = <InternationalLogs logs={log.international} />;
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
              className={classnames("nav-item nav-link", {
                active: view === "all"
              })}
              href="#all"
              onClick={() => this.navigate("all")}
            >
              All
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

export default connect(mapStateToProps)(Logs);
