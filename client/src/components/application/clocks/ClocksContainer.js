import React, { Component } from "react";

import ReactCountryFlag from "react-country-flag";
import Clock from "react-live-clock";

import "./Clocks.css";

class ClocksContainer extends Component {
  render() {
    return (
      <div className="clocks-container">
        <div className="clocks-col-1">
          <div className="clock-box">
            <ReactCountryFlag code="ph" svg />

            <span title="Manila/Malaysia" className="clock-item text-primary">
              Manila
            </span>

            <Clock
              className="clock-item"
              format={"ddd h:mm a"}
              ticking={true}
              timezone={"Asia/Manila"}
            />
          </div>

          <div className="clock-box">
            <ReactCountryFlag code="za" svg />

            <span className="clock-item text-primary">S. Africa</span>

            <Clock
              className="clock-item"
              format={"ddd h:mm a"}
              ticking={true}
              timezone={"Africa/Johannesburg"}
            />
          </div>

          <div className="clock-box">
            <ReactCountryFlag code="th" svg />

            <span title="Thailand/Cambodia" className="clock-item text-primary">
              Thailand
            </span>

            <Clock
              className="clock-item"
              format={"ddd h:mm a"}
              ticking={true}
              timezone={"Asia/Bangkok"}
            />
          </div>
        </div>

        <div className="clocks-col-2">
          <div className="clock-box">
            <ReactCountryFlag code="gb" svg />

            <span className="clock-item text-primary">London</span>

            <Clock
              className="clock-item"
              format={"ddd h:mm a"}
              ticking={true}
              timezone={"Europe/London"}
            />
          </div>

          <div className="clock-box">
            <ReactCountryFlag code="us" svg />

            <span className="clock-item text-primary">New York</span>

            <Clock
              className="clock-item"
              format={"ddd h:mm a"}
              ticking={true}
              timezone={"America/New_York"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ClocksContainer;
