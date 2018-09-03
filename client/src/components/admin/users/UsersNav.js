import React, { Component } from "react";
import { Button } from "reactstrap";

class UsersNav extends Component {
  render() {
    const { toggleRegisterModal } = this.props;

    return (
      <nav className="logs-nav navbar navbar-expand-sm navbar-light mb-3">
        <span className="navbar-brand">Users</span>
        {/* <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#usersNavbar"
          aria-controls="usersNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button> */}

        <Button color="primary" onClick={toggleRegisterModal}>
          <i className="fas fa-user-plus" /> New User
        </Button>

        {/* @navbar */}
        {/* <div className="collapse navbar-collapse" id="usersNavbar" /> */}
      </nav>
    );
  }
}

export default UsersNav;
