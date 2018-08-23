import React, { Component } from "react";

class ActivityNav extends Component {
  render() {
    return (
      <nav className="logs-nav navbar navbar-expand-sm navbar-light mb-3">
        <span className="navbar-brand">Activity Log</span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#domesticNavbar"
          aria-controls="domesticNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* @navbar */}
        <div className="collapse navbar-collapse" id="domesticNavbar">
         
        </div>
      </nav>
    );
  }
}

export default ActivityNav;
