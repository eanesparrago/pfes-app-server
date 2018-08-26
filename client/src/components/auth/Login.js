import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import Spinner from "../common/Spinner";

import "./Login.css";
import logo from "../../img/pfes-logo.png";

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
    const { auth } = this.props;

    // Show error for both if either username or password is invalid
    // This is to reduce information given to potential hackers
    let validation = null;

    if (errors.userName || errors.password) {
      validation = "Invalid login information";
    }

    let formInputs;

    if (auth.loading) {
      formInputs = <Spinner />;
    } else {
      formInputs = (
        <React.Fragment>
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
        </React.Fragment>
      );
    }

    return (
      <div className="Login">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="Logo">
                <img className="Logo-img" src={logo} alt="PFES Logo" />
              </div>
            </div>

            <div className="col-lg-6">
              <h1 className="display-4 text-center">Welcome</h1>
              <p className="lead text-center">
                Log in to your PFES App account
              </p>
              <form onSubmit={this.onSubmit}>
                {formInputs}

                <input
                  disabled={auth.loading ? true : false}
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
