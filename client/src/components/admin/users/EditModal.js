import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import { editUser } from "../../../actions/usersActions";
import { clearRegister } from "../../../actions/registerActions";
import { clearErrors } from "../../../actions/logsActions";

import isEmpty from "../../../validation/is-empty";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";

class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      userType: "",
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      isActive: false
    };

    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
    this.toggleIsActive = this.toggleIsActive.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedUser) {
      this.setState({
        userName: nextProps.selectedUser.userName,
        userType: nextProps.selectedUser.userType,
        firstName: nextProps.selectedUser.firstName,
        lastName: nextProps.selectedUser.lastName,
        email: nextProps.selectedUser.email,
        contact: nextProps.selectedUser.contact,
        isActive: nextProps.selectedUser.isActive
      });
    }

    if (nextProps.register) {
      if (!isEmpty(nextProps.register)) {
        this.props.clearErrors();
        this.props.getAllUsers();
        this.props.clearRegister();

        this.props.toggleEditModal();
      }
    }
  }

  onChange(e) {
    if (e.target.name === "userName") {
      const regex = /^[A-Za-z0-9]+$/u;

      if (e.target.value === "") {
        this.setState({ [e.target.name]: e.target.value });
      } else if (regex.test(e.target.value)) {
        this.setState({ [e.target.name]: e.target.value });
      }
      return;
    } else if (e.target.name === "firstName" || e.target.name === "lastName") {
      const regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

      if (e.target.value === "") {
        this.setState({ [e.target.name]: e.target.value });
      } else if (regex.test(e.target.value)) {
        this.setState({ [e.target.name]: e.target.value });
      }
      return;
    } else if (e.target.name === "contact") {
      const regex = /[\d-]+$/u;

      if (e.target.value === "") {
        this.setState({ [e.target.name]: e.target.value });
      } else if (regex.test(e.target.value)) {
        this.setState({ [e.target.name]: e.target.value });
      }
      return;
    } else {
      this.setState({ [e.target.name]: e.target.value });
      console.log("else");
    }
  }

  toggleIsActive() {
    this.setState({ isActive: !this.state.isActive });
  }

  submit(e) {
    e.preventDefault();

    const editData = {
      userName: this.state.userName,
      userType: this.state.userType,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      contact: this.state.contact,
      isActive: this.state.isActive
    };

    this.props.editUser(editData);
  }

  render() {
    const { selectedUser, isEditModalOpen, toggleEditModal } = this.props;
    const { errors, users } = this.props;

    return (
      <div>
        <Modal
          isOpen={isEditModalOpen}
          toggle={toggleEditModal}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            <span>Edit user {selectedUser.userName}</span>
          </ModalHeader>

          <ModalBody>
            <Form>
              <FormGroup>
                <Label className="mb-1" for="registerUserType">
                  User Type
                </Label>

                <Input
                  className={classnames("", {
                    "is-invalid": errors.userType
                  })}
                  type="select"
                  name="userType"
                  id="registerUserType"
                  value={this.state.userType}
                  onChange={this.onChange}
                  placeholder=""
                >
                  <option label=" " />
                  <option value="sales">Sales</option>
                  <option value="operations">Operations</option>
                  <option value="viewer">Viewer</option>
                  <option value="admin">Administrator</option>
                </Input>

                {errors.userType && (
                  <div className="invalid-feedback">{errors.userType}</div>
                )}
              </FormGroup>

              <FormGroup>
                <Label className="mb-1" for="registerfirstName">
                  Firstname
                </Label>

                <Input
                  className={classnames("", {
                    "is-invalid": errors.firstName
                  })}
                  type="text"
                  name="firstName"
                  id="registerfirstName"
                  value={this.state.firstName}
                  onChange={this.onChange}
                  placeholder=""
                  maxLength="30"
                />

                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </FormGroup>

              <FormGroup>
                <Label className="mb-1" for="registerlastName">
                  Lastname
                </Label>

                <Input
                  className={classnames("", {
                    "is-invalid": errors.lastName
                  })}
                  type="text"
                  name="lastName"
                  id="registerlastName"
                  value={this.state.lastName}
                  onChange={this.onChange}
                  placeholder=""
                  maxLength="30"
                />

                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </FormGroup>

              <FormGroup>
                <Label className="mb-1" for="registerEmail">
                  Email
                </Label>

                <Input
                  className={classnames("", {
                    "is-invalid": errors.email
                  })}
                  type="email"
                  name="email"
                  id="registerEmail"
                  value={this.state.email}
                  onChange={this.onChange}
                  placeholder=""
                  maxLength="30"
                />

                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </FormGroup>

              <FormGroup>
                <Label className="mb-1" for="registerContact">
                  Contact Number
                </Label>

                <Input
                  className={classnames("", {
                    "is-invalid": errors.contact
                  })}
                  type="text"
                  name="contact"
                  id="registerContact"
                  value={this.state.contact}
                  onChange={this.onChange}
                  placeholder=""
                  maxLength="15"
                />

                {errors.contact && (
                  <div className="invalid-feedback">{errors.contact}</div>
                )}
              </FormGroup>

              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    checked={this.state.isActive}
                    onChange={this.toggleIsActive}
                  />{" "}
                  Active
                </Label>
              </FormGroup>

              <Button className="mt-3" color="danger">Delete User</Button>

              {/* <div className="dropdown-divider mb-3" />

              <FormGroup>
                <Label for="registerPassword">Password</Label>

                <Input
                  className={classnames("", {
                    "is-invalid": errors.password
                  })}
                  type="password"
                  name="password"
                  id="registerPassword"
                  value={this.state.password}
                  onChange={this.onChange}
                  placeholder=""
                  maxLength="100"
                />

                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </FormGroup>

              <FormGroup>
                <Label className="mb-1" for="registerPassword2">
                  Confirm Password
                </Label>

                <Input
                  className={classnames("", {
                    "is-invalid": errors.password2
                  })}
                  type="password"
                  name="password2"
                  id="registerPassword2"
                  value={this.state.password2}
                  onChange={this.onChange}
                  placeholder=""
                  maxLength="30"
                />

                {errors.password2 && (
                  <div className="invalid-feedback">{errors.password2}</div>
                )}
              </FormGroup> */}
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button
              disabled={users.submitInProgress ? true : false}
              color="primary"
              onClick={this.submit}
            >
              Confirm Edit
            </Button>

            <Button
              disabled={users.submitInProgress ? true : false}
              color="secondary"
              onClick={toggleEditModal}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  users: state.users,
  register: state.register
});

export default connect(
  mapStateToProps,
  {
    editUser,
    clearRegister,
    clearErrors
  }
)(EditModal);
