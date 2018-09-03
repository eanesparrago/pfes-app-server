import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { clearErrors } from "../../../actions/logsActions";
import { changePassword } from "../../../actions/usersActions";
import { resetSuccess } from "../../../actions/usersActions";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";

class PasswordModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      password2: ""
    };

    this.onChange = this.onChange.bind(this);
    this.submitChangePassword = this.submitChangePassword.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitChangePassword(e) {
    e.preventDefault();

    const passwordData = {
      userName: this.props.userName,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.changePassword(passwordData);
  }

  render() {
    const { userName, togglePasswordModal, isPasswordModalOpen } = this.props;
    const { errors, users } = this.props;

    return (
      <div>
        <Modal
          isOpen={isPasswordModalOpen}
          toggle={togglePasswordModal}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            <span>Change password of user {userName}</span>
          </ModalHeader>

          <ModalBody>
            <Form>
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

                <small className="form-text text-muted">
                  At least 6 characters
                </small>

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
                  maxLength="100"
                />

                {errors.password2 && (
                  <div className="invalid-feedback">{errors.password2}</div>
                )}
              </FormGroup>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button
              disabled={users.submitInProgress ? true : false}
              color="primary"
              onClick={this.submitChangePassword}
            >
              Change Password
            </Button>

            <Button
              disabled={users.submitInProgress ? true : false}
              color="secondary"
              onClick={togglePasswordModal}
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
    clearErrors,
    changePassword,
    resetSuccess
  }
)(PasswordModal);
