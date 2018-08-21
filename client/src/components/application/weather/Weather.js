import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import SpinnerSmall from "../../common/SpinnerSmall";

import "./Weather.css";

class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.getIcon = this.getIcon.bind(this);
  }

  getIcon(weather) {
    let icon = <ion-icon size="large" name="sunny" />;

    switch (weather) {
      case "clear-day":
        icon = <ion-icon size="large" name="sunny" />;
        break;

      case "clear-night":
        icon = <ion-icon size="large" name="moon" />;
        break;

      case "rain":
      case "snow":
        icon = <ion-icon size="large" name="rainy" />;
        break;

      case "cloudy":
      case "fog":
        icon = <ion-icon size="large" name="cloud" />;
        break;

      case "wind":
      case "partly-cloudy-day":
        icon = <ion-icon size="large" name="cloudy" />;
        break;

      case "partly-cloudy-night":
        icon = <ion-icon size="large" name="cloudy-night" />;
        break;

      default:
        icon = <ion-icon size="large" name="sunny" />;
    }

    return icon;
  }

  render() {
    const { weather } = this.props;
    const { currently, daily } = weather;

    let content = null;

    // Show spinner if weather is not loading yet
    if (!Object.keys(weather).length) {
      content = <SpinnerSmall />;
    } else {
      content = (
        <div className="weather-container">
          <div className="weather-today">
            <div className="weather-today-top">
              <div
                title={currently.summary}
                className="weather-today-icon text-primary"
              >
                {this.getIcon(currently.icon)}
              </div>

              <h3>
                {currently.temperature}
                &deg;C
              </h3>
            </div>

            <span>
              <small>{currently.summary}</small>
            </span>
          </div>

          <div className="weather-forecast">
            <div className="weather-forecast-item">
              <div
                title={daily.data[1].summary}
                className="weather-forecast-icon text-primary"
              >
                {this.getIcon(daily.data[1].icon)}
              </div>

              <small>
                {daily.data[1].temperatureHigh}
                &deg;C
              </small>

              <small>
                {moment(daily.data[1].time * 1000).format("MMM DD")}
              </small>
            </div>

            <div className="weather-forecast-item">
              <div
                title={daily.data[2].summary}
                className="weather-forecast-icon text-primary"
              >
                {this.getIcon(daily.data[2].icon)}
              </div>

              <small>
                {daily.data[2].temperatureHigh}
                &deg;C
              </small>

              <small>
                {moment(daily.data[2].time * 1000).format("MMM DD")}
              </small>
            </div>

            <div className="weather-forecast-item">
              <div
                title={daily.data[3].summary}
                className="weather-forecast-icon text-primary"
              >
                {this.getIcon(daily.data[3].icon)}
              </div>

              <small>
                {daily.data[3].temperatureHigh}
                &deg;C
              </small>

              <small>
                {moment(daily.data[3].time * 1000).format("MMM DD")}
              </small>
            </div>

            <div className="weather-forecast-item">
              <div
                title={daily.data[4].summary}
                className="weather-forecast-icon text-primary"
              >
                {this.getIcon(daily.data[4].icon)}
              </div>

              <small>
                {daily.data[4].temperatureHigh}
                &deg;C
              </small>

              <small>
                {moment(daily.data[4].time * 1000).format("MMM DD")}
              </small>
            </div>
          </div>
        </div>
      );
    }

    return <div>{content}</div>;
  }
}

const mapStateToProps = state => ({
  weather: state.weather.weather
});

export default connect(
  mapStateToProps,
  null
)(Weather);
