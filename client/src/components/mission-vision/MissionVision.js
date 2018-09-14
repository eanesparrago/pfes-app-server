import React, { Component } from "react";

import logo from "../../img/pfes-logo.png";
import bg from "../../img/bg.jpg";

class MissionVision extends Component {
  componentDidMount() {
    document.body.style.backgroundImage = `url("${bg}")`;
  }
  render() {
    return (
      <div className="container fade-in">
        <div className="p-4 mb-3 text-center">
          <img className="img-fluid" src={logo} alt="PFES logo" />
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-body text-center shadow">
                <h1 className="text-primary">Our Mission</h1>

                <p style={{ lineHeight: "2" }}>
                  In order to provide high quality, cost effective and reliable
                  services in the forwarding industry, PFES Worldwide Logistics
                  Corporation aims to strengthen its workforce and focuses its
                  undertaking in offering more than a complete logistics
                  services
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-body text-center shadow">
                <h1 className="text-primary">Our Vision</h1>

                <p style={{ lineHeight: "2" }}>
                  PFES Worldwide Logisitcs Corporation envisions itself to be a
                  dynamic logistics company providing international and domestic
                  sea and air freight forwarding and inland transportation
                  services in high quality, cost effective, and reliable manner
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MissionVision;
