import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";

import generateBadge from "../../../utils/generateBadge";

class ActivityItem extends Component {
  render() {
    const {
      userID,
      userFullName,
      userType,

      actionSummary,
      time
    } = this.props.activity;

    const { auth } = this.props;

    const badge = generateBadge(userType);

    return (
      <div className="list-group-item flex-column align-items-start">
        <div className="d-flex justify-content-between">
          <span className="mb-1">
            {badge}{" "}
            <strong>
              <span className="text-nowrap">{userFullName}</span>{" "}
              {auth.user.id === userID ? "(You)" : null}
            </strong>
          </span>

          <small>{moment(time).format("MMMM Do YYYY, h:mm:ssa")}</small>
        </div>

        <p>{actionSummary}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  null
)(ActivityItem);
