import React, { Component } from "react";

class ActivityNav extends Component {
  render() {
    return (
      <nav className="logs-nav navbar navbar-expand-sm navbar-light mb-3">
        <span className="navbar-brand">
          Activity Log{" "}
          <em className="text-muted">&mdash; Last 20 Activities</em>
        </span>
      </nav>
    );
  }
}

export default ActivityNav;
