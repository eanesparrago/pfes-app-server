import React, { Component } from "react";
import Register from "./Register";
import UsersTable from "./UsersTable";
import RegisterContainer from "./RegisterContainer";
import { connect } from "react-redux";

class Users extends Component {
  componentWillMount() {
    if (this.props.auth.user.userType !== "admin") {
      this.props.history.push("/app");
    }
  }

  render() {
    return (
      <div className="mx-3 mt-3">
        <RegisterContainer />
        <UsersTable />
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
)(Users);
