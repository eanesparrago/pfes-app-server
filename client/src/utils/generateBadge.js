import React from "react";

export default userType => {
  let badge = null;

  switch (userType) {
    case "admin":
      badge = (
        <span className="badge badge-primary">
          <i className="fas fa-toolbox" /> Admin
        </span>
      );
      break;

    case "sales":
      badge = (
        <span className="badge badge-primary">
          <i className="fas fa-comments" /> Sales
        </span>
      );
      break;

    case "operations":
      badge = (
        <span className="badge badge-primary">
          <i className="fas fa-truck-loading" /> Operations
        </span>
      );
      break;

    case "viewer":
      badge = (
        <span className="badge badge-primary">
          <i className="fas fa-book-open" /> Viewer
        </span>
      );
      break;

    default:
      badge = <span className="badge badge-primary">Unknown</span>;
      break;
  }

  return badge;
};
