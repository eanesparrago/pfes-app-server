import React, { Component } from "react";
import UsersTable from "./UsersTable";
import { connect } from "react-redux";
import { clearErrors } from "../../../actions/logsActions";
import { resetSuccess } from "../../../actions/usersActions";
import { logoutUser } from "../../../actions/authActions";

import UsersNav from "./UsersNav";
import RegisterModal from "./RegisterModal";
import EditModal from "./EditModal";
import AlertBox from "../../application/AlertBox";

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRegisterModalOpen: false,
      isEditModalOpen: false,

      selectedUser: {}
    };

    this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
  }

  componentWillMount() {
    if (this.props.auth.user.userType !== "admin") {
      this.props.history.push("/app");
    }
  }

  componentDidMount() {
    // Logout if token has expired
    const currentTime = Date.now() / 1000;
    if (this.props.auth.user.exp < currentTime) {
      this.props.logoutUser();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users) {
      if (
        nextProps.users.success.isSuccessful === true &&
        nextProps.users.success.type === "edit"
      ) {
        this.setState({ isEditModalOpen: false, selectedUser: {} });

        this.props.resetSuccess();
      }
    }
  }

  toggleRegisterModal() {
    this.setState({
      isRegisterModalOpen: !this.state.isRegisterModalOpen
    });

    this.props.clearErrors();

    // Logout if token has expired
    const currentTime = Date.now() / 1000;
    if (this.props.auth.user.exp < currentTime) {
      this.props.logoutUser();
    }
  }

  toggleEditModal() {
    this.setState({
      isEditModalOpen: !this.state.isEditModalOpen
    });

    this.props.clearErrors();
  }

  openEditModal(user) {
    this.setState({
      isEditModalOpen: true,
      selectedUser: user
    });

    this.props.clearErrors();

    // Logout if token has expired
    const currentTime = Date.now() / 1000;
    if (this.props.auth.user.exp < currentTime) {
      this.props.logoutUser();
    }
  }

  render() {
    return (
      <div className="mobile-margin mx-3">
        <UsersNav toggleRegisterModal={this.toggleRegisterModal} />

        <AlertBox />

        <RegisterModal
          isRegisterModalOpen={this.state.isRegisterModalOpen}
          toggleRegisterModal={this.toggleRegisterModal}
        />

        <EditModal
          selectedUser={this.state.selectedUser}
          isEditModalOpen={this.state.isEditModalOpen}
          toggleEditModal={this.toggleEditModal}
        />

        <UsersTable openEditModal={this.openEditModal} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users
});

export default connect(
  mapStateToProps,
  { clearErrors, resetSuccess, logoutUser }
)(Users);
