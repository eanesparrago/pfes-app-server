import React, { Component } from "react";
import { connect } from "react-redux";

class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <div>Weather</div>;
  }
}

const mapStateToProps = state => ({
  weather: state.weather
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  null
)(Weather);
