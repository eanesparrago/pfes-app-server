import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Log in to your PFES account</p>

              <form>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Username"
                    className="form-control form-control-lg"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control form-control-lg"
                  />
                </div>
                <input type="submit" className="btn btn-primary btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
