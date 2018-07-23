import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import ApplicationNav from "./components/application/ApplicationNav";
import Users from "./components/admin/users/Users";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current profile

    //  Redirect to login
    window.location.href = "/";

    console.log("token expired");
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />

            <div className="container">
              <Route exact path="/" component={Login} />

              <Switch>
                {/* App navigation tabs */}
                <Route path="/app" component={ApplicationNav} />

                <Route render={() => <h1>Not found</h1>} />
              </Switch>

              {/* Admin - user management */}
              <Route exact path="/app/users" component={Users} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
