import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/admin/Register";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Navbar} />
          <Route path="/admin" component={Navbar} />

          {/* <Navbar /> */}
          <div className="container">
            <Route exact path="/" component={Login} />
            <Route exact path="/admin/register" component={Register} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
