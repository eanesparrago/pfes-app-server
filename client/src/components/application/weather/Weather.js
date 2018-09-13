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
    let icon = <i className="wi wi-day-sunny" />;

    switch (weather) {
      case "clear-day":
        icon = <i className="wi wi-day-sunny" />;
        break;

      case "clear-night":
        icon = <i className="wi wi-night-clear" />;
        break;

      case "rain":
        icon = <i className="wi wi-rain" />;
        break;

      case "snow":
        icon = <i className="wi wi-snow" />;
        break;

      case "cloudy":
        icon = <i className="wi wi-cloudy" />;
        break;

      case "fog":
        icon = <i className="wi wi-fog" />;
        break;

      case "wind":
        icon = <i className="wi wi-cloudy-windy" />;
        break;

      case "partly-cloudy-day":
        icon = <i className="wi wi-day-cloudy" />;
        break;

      case "partly-cloudy-night":
        icon = <i className="wi wi-night-alt-cloudy" />;
        break;

      default:
        icon = <i className="wi wi-cloud" />;
    }

    return icon;
  }

  render() {
    const { weather } = this.props;
    const { currently, daily } = weather.weather;

    let content = null;

    console.log(weather.loading, weather.success);

    // Show spinner if weather is not loading yet
    // if (!Object.keys(weather).length) {
    if (weather.loading === true) {
      content = <SpinnerSmall />;
    } else if (weather.loading === false && weather.success === false) {
      content = (
        <div className="weather-container">
          <em className="text-muted">
            Weather information is currently unavailable or your location data
            is inaccessible.
          </em>
        </div>
      );
    } else if (weather.success === true) {
      content = (
        <div>
          <div className="weather-container">
            <div className="weather-today">
              <div className="weather-today-top">
                <div
                  title={currently.summary}
                  className="weather-today-icon icon-wrap text-primary"
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
                  className="weather-forecast-icon icon-wrap-s text-primary"
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
                  className="weather-forecast-icon icon-wrap-s text-primary"
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
                  className="weather-forecast-icon icon-wrap-s text-primary"
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

              {/* <div className="weather-forecast-item">
                <div
                  title={daily.data[4].summary}
                  className="weather-forecast-icon icon-wrap-s text-primary"
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
              </div> */}
            </div>
          </div>
        </div>
      );
    }

    return <div>{content}</div>;
  }
}

const mapStateToProps = state => ({
  weather: state.weather
});

export default connect(
  mapStateToProps,
  null
)(Weather);
