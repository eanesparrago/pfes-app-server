import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import Toolbar from "react-big-calendar/lib/Toolbar";
import moment from "moment";
import holidays from "./holidays";
import { connect } from "react-redux";

import generateEvents from "./generateEvents";

import Spinner from "../../common/Spinner";

import "react-big-calendar/lib/css/react-big-calendar.css";

BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDomestic: true,
      showInternational: true,
      showHolidays: true
    };

    this.toggleCheck = this.toggleCheck.bind(this);
  }

  toggleCheck(e) {
    this.setState({ [e.target.name]: !this.state[e.target.name] }, () => {
      console.log(this.state);
    });
  }

  render() {
    const { log } = this.props;
    const { domestic, international } = this.props.log;
    const { showDomestic, showInternational, showHolidays } = this.state;

    let events = [];

    let domesticEvents = [];
    let internationalEvents = [];

    if (domestic !== null && international !== null) {
      domesticEvents = generateEvents(domestic);
      internationalEvents = generateEvents(international);

      if (showDomestic === true) {
        events = events.concat(domesticEvents);
      }
      if (showInternational === true) {
        events = events.concat(internationalEvents);
      }
    }

    if (showHolidays === true) {
      events = events.concat(holidays);
    }

    // Format for the event text
    function Event({ event }) {
      if (event.type === "Holiday") {
        return <span>{event.title}</span>;
      } else {
        return (
          <span>
            <strong>{event.title}</strong> {event.shipperConsignee} (
            {event.status} - {event.operationsStatus}) &mdash;{" "}
            <em>{event.associate}</em>
          </span>
        );
      }
    }

    // Define custom toolbar
    class CustomToolbar extends Toolbar {
      navigate = action => {
        this.props.onNavigate(action);
      };

      view = view => {
        this.props.onView(view);
      };

      render() {
        return (
          <div className="container text-center mb-3">
            <h2>{this.props.label}</h2>

            <div className="btn-group" role="group" aria-label="Basic example">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => this.navigate("PREV")}
              >
                Back
              </button>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => this.navigate("TODAY")}
              >
                Today
              </button>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => this.navigate("NEXT")}
              >
                Next
              </button>
            </div>
          </div>
        );
      }
    }

    // Custom components
    let components = {
      event: Event,
      toolbar: CustomToolbar
    };

    // MAIN CONTENT
    let content;

    if (log.domestic === null || log.international === null || log.loading) {
      content = <Spinner />;
    } else {
      content = (
        <div style={{ height: "60rem" }} className="m-3 mx-5 mb-2 pb-5">
          <div className="text-center mb-2">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="showDomestic"
                name="showDomestic"
                checked={this.state.showDomestic}
                onChange={this.toggleCheck}
              />
              <label className="form-check-label" htmlFor="showDomestic">
                Show Domestic Logs
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="showInternational"
                id="showInternational"
                checked={this.state.showInternational}
                onChange={this.toggleCheck}
              />
              <label className="form-check-label" htmlFor="showInternational">
                Show International Logs
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="showHolidays"
                id="showHolidays"
                checked={this.state.showHolidays}
                onChange={this.toggleCheck}
              />
              <label className="form-check-label" htmlFor="showHolidays">
                Show Holidays
              </label>
            </div>
          </div>

          <BigCalendar
            events={events}
            showMultiDayTimes
            views={["month"]}
            popup
            components={components}
            eventPropGetter={(event, start, end, isSelected) => {
              let classes;
              let style = {};

              switch (event.type) {
                case "Domestic":
                  if (isSelected) {
                    style = { backgroundColor: "#0c6cc0" };
                  } else {
                    classes = "bg-primary";
                  }
                  break;

                case "International":
                  if (isSelected) {
                    style = { backgroundColor: "#117888" };
                  } else {
                    classes = "bg-info";
                  }
                  break;

                case "Holiday":
                  classes = "bg-secondary";
                  style = { cursor: "unset" };

                  break;

                default:
                  classes = "bg-primary";
              }

              return {
                className: classes,
                style: style
              };
            }}
          />
        </div>
      );
    }

    return <div className="fade-in">{content}</div>;
  }
}

const mapStateToProps = state => ({
  log: state.log
});

export default connect(mapStateToProps)(Calendar);
