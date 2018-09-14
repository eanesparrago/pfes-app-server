import React, { Component } from "react";

class ActivityNav extends Component {
  render() {
    return (
      <nav className="logs-nav navbar navbar-expand-sm navbar-light mb-3">
        <span className="navbar-brand">
          Activity Log <em className="text-muted">&mdash; Last 20 Activities</em>
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#activityNavbar"
          aria-controls="activityNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* @navbar */}
        <div className="collapse navbar-collapse" id="activityNavbar" />
      </nav>
    );
  }
}

export default ActivityNav;
