import React, { Component } from "react";
import { connect } from "react-redux";

import Spinner from "../../common/Spinner";

import ActivityNav from "./ActivityNav";
import ActivityList from "./ActivityList";

import { getAllActivities } from "../../../actions/activityActions";
import { logoutUser } from "../../../actions/authActions";

class Activity extends Component {
  componentDidMount() {
    this.props.getAllActivities();

    // Logout if token has expired
    const currentTime = Date.now() / 1000;
    if (this.props.auth.user.exp < currentTime) {
      this.props.logoutUser();
    }
  }

  render() {
    const { domestic, international } = this.props.activity;

    let content;
    if (domestic.loading || international.loading) {
      content = <Spinner />;
    } else {
      content = (
        <div className="fade-in">
          <ActivityNav />

          <div className="row">
            <div className="col-lg-6">
              <div className="list-group">
                <h4>Domestic</h4>

                <ActivityList activities={domestic.activities} />
              </div>
            </div>

            <div className="col-lg-6">
              <h4>International</h4>

              <div className="list-group">
                <ActivityList activities={international.activities} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <div className="mx-3 mobile-margin">{content}</div>;
  }
}

const mapStateToProps = state => ({
  activity: state.activity,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAllActivities, logoutUser }
)(Activity);
