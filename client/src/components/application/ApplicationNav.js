import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";

class ApplicationNav extends Component {
  constructor() {
    super();
    this.state = {
      active: "/app/logs"
    };

    this.handleClick = this.handleClick.bind(this);
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

  componentDidMount() {}

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
      <div>
        <h3 className="mb-3">
          <em>Hello {auth.user.firstName}.</em>
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
  null
)(ApplicationNav);
