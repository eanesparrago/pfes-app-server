import React, { Component } from "react";

import ActivityItem from "./ActivityItem";

class ActivityList extends Component {
  render() {
    const { activities } = this.props;

    return activities.map(activity => (
      <ActivityItem key={activity._id} activity={activity} />
    ));
  }
}

export default ActivityList;
