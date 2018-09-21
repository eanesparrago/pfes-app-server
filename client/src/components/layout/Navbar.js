import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();

    this.props.logoutUser();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    let userType;

    switch (user.userType) {
      case "admin":
        userType = "Administrator";
        break;

      case "sales":
        userType = "Sales";
        break;

      case "operations":
        userType = "Operations";
        break;

      case "viewer":
        userType = "Viewer";
        break;

      default:
        userType = "Unknown";
    }

    const authLinks = (
      // <div className="collapse navbar-collapse" id="navbarSupportedContent">
      //   <ul className="navbar-nav ml-auto">
      //     <li className="nav-item dropdown">
      //       <a
      //         className="nav-link dropdown-toggle"
      //         data-toggle="dropdown"
      //         role="button"
      //         aria-haspopup="true"
      //         aria-expanded="false"
      //       >
      //         {user.userName} ({userType})
      //       </a>

      //       <div className="dropdown-menu">
      //         <a
      //           onClick={this.onLogoutClick.bind(this)}
      //           className="dropdown-item"
      //         >
      //           Help
      //         </a>

      //         <a
      //           onClick={this.onLogoutClick.bind(this)}
      //           className="dropdown-item"
      //         >
      //           Logout
      //         </a>
      //       </div>
      //     </li>
      //   </ul>
      // </div>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {/* <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
        </ul> */}

        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {user.userName} ({userType})
            </a>

            <div className="dropdown-menu">
              <Link className="dropdown-item" to="/mission-vision">
                Mission & Vision
              </Link>

              <div className="dropdown-divider" />

              <a
                onClick={this.onLogoutClick.bind(this)}
                className="dropdown-item"
              >
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-3 pfes-navbar">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              PFES App
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            {isAuthenticated ? authLinks : null}
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
