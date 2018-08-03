import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/app/logs");
    }
  }

  componentWillUnmount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/app");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      userName: this.state.userName,
      password: this.state.password
    };

    this.props.loginUser(user);
  }

  render() {
    const { errors } = this.state;

    // Show error for both if either username or password is invalid
    // This is to reduce information given to potential hackers
    let validation = null;

    if (errors.userName || errors.password) {
      validation = "Invalid login information";
    }

    return (
      <div className="Login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Welcome</h1>
              <p className="lead text-center">Log in to your PFES account</p>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Username"
                  name="userName"
                  value={this.state.userName}
                  onChange={this.onChange}
                  error={validation}
                />

                <TextFieldGroup
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={validation}
                />
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
