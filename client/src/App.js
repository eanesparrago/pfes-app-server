import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Register from "./components/admin/Register";
import UsersTable from "./components/admin/UsersTable";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Navbar} />
            <Route path="/admin" component={Navbar} />

            {/* <Navbar /> */}
            <div className="container">
              <Route exact path="/" component={Login} />

              <div className="container">
                <div className="row">
                  <Route exact path="/admin/register" component={Register} />
                  <Route exact path="/admin/register" component={UsersTable} />
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
