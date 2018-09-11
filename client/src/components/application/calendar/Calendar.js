import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import Toolbar from "react-big-calendar/lib/Toolbar";
import moment from "moment";
import holidays from "./holidays";
import { connect } from "react-redux";

import { openLogView } from "../../../actions/logsActions";
import { logoutUser } from "../../../actions/authActions";

import generateEvents from "./generateEvents";

import Spinner from "../../common/Spinner";
import HolidayPopUp from "./HolidayPopup";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import classnames from "classnames";

BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDomestic: true,
      showInternational: true,
      showHolidays: true,
      isBig: false
    };

    this.toggleCheck = this.toggleCheck.bind(this);
  }

  componentDidMount() {
    // Logout if token has expired
    const currentTime = Date.now() / 1000;
    if (this.props.auth.user.exp < currentTime) {
      this.props.logoutUser();
    }
  }

  toggleCheck(e) {
    this.setState({ [e.target.name]: !this.state[e.target.name] }, () => {});
  }

  render() {
    const { log, openLogView, auth } = this.props;
    const { domestic, international } = this.props.log;
    const { showDomestic, showInternational, showHolidays } = this.state;

    let events = [];

    let domesticEvents = [];
    let internationalEvents = [];

    if (showHolidays === true) {
      events = events.concat(holidays);
    }

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

    const EventWrapper = () => ({ event }) => {
      if (event.type === "Holiday") {
        return (
          <div>
            <button
              className="btn btn-sm btn-secondary w-100 d-block text-left text-nowrap text-truncate"
              data-toggle="modal"
              data-target="#holidayPopup"
            >
              {event.title}
            </button>

            <HolidayPopUp eventTitle={event.title} eventDate={event.start} />
          </div>
        );
      } else {
        return (
          <button
            className={classnames(
              "btn btn-sm  w-100 d-block text-white text-left",
              {
                "btn-primary": auth.user.id === event.log.user,
                "btn-info": auth.user.id !== event.log.user,
                "btn-success": event.status === "Complete"
              }
            )}
            data-toggle="modal"
            data-target="#LogView"
            onClick={() => {
              openLogView(event.log);
            }}
            title={`${event.title} ${event.shipperConsignee} (${
              event.status
            } - ${event.operationsStatus}) — ${event.associate}`}
          >
            <strong>
              {event.title}
              {event.log.tags.urgent ? "!" : null}
            </strong>
          </button>
        );
      }
    };

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
          <nav className="logs-nav navbar navbar-expand-sm navbar-light mb-3">
            <div style={{ width: "12rem" }}>
              <span className="navbar-brand">{this.props.label}</span>
            </div>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#calendarNavbar"
              aria-controls="calendarNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            {/* @navbar */}
            <div className="collapse navbar-collapse" id="calendarNavbar">
              <div
                className="btn-group shadow-sm"
                role="group"
                aria-label="Basic example"
              >
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
          </nav>
        );
      }
    }

    // Custom components
    let components = {
      event: Event,
      toolbar: CustomToolbar,
      eventWrapper: EventWrapper({ openLogView })
    };

    // MAIN CONTENT
    let content;

    if (log.domestic === null || log.international === null || log.loading) {
      content = <Spinner />;
    } else {
      content = (
        <div
          style={{
            height: this.state.isBig ? "121rem" : "70rem",
            overscrollBehaviorX: "auto"
          }}
          className="Calendar mx-3 mobile-margin pb-5"
        >
          <BigCalendar
            events={events}
            showMultiDayTimes
            views={["month"]}
            popup
            components={components}
          />

          {/* Visibility controls. Hidden for now because they ugly */}
          <div className="text-center mt-2">
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

            <div
              className="btn-group shadow-sm"
              role="group"
              aria-label="Basic example"
            >
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => {
                  this.setState({ isBig: false });
                  this.forceUpdate();
                }}
              >
                Small
              </button>

              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => {
                  this.setState({ isBig: true });
                  this.forceUpdate();
                }}
              >
                Big
              </button>
            </div>
          </div>
        </div>
      );
    }

    return <div className="fade-in">{content}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  log: state.log
});

export default connect(
  mapStateToProps,
  { openLogView, logoutUser }
)(Calendar);
