import React, { Component } from "react";
import { connect } from "react-redux";

import moment from "moment";
import logo from "../../img/pfes-logo.png";
import generateBadge from "../../utils/generateBadge";

import Weather from "./weather/Weather";
import ClocksContainer from "./clocks/ClocksContainer";
import Particles from "react-particles-js";

import "./ApplicationHeader.css";

class ApplicationHeader extends Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }

  render() {
    const { auth } = this.props;
    const { user } = auth;

    const badge = generateBadge(auth.user.userType);

    return (
      <div>
        <input type="checkbox" id="flip" />

        <div className="pfes-card-container mb-3">
          <div className="pfes-card-body">
            {/* FRONT */}
            <div className="card mb-3 shadow-sm pfes-header pfes-card-side side-front">
              <label htmlFor="flip" id="flip-label">
                <div id="particlesFront">
                  {this.props.weather.success === true &&
                  this.props.weather.weather.currently.icon === "rain" ? (
                    <Particles
                      params={{
                        particles: {
                          number: {
                            value: 200,
                            density: { enable: true, value_area: 800 }
                          },
                          color: { value: "#007bff" },
                          shape: {
                            type: "circle",
                            stroke: { width: 0, color: "#000000" },
                            polygon: { nb_sides: 3 },
                            image: {
                              src: "img/github.svg",
                              width: 100,
                              height: 100
                            }
                          },
                          opacity: {
                            value: 0.5,
                            random: true,
                            anim: {
                              enable: false,
                              speed: 1,
                              opacity_min: 0.1,
                              sync: false
                            }
                          },
                          size: {
                            value: 2,
                            random: true,
                            anim: {
                              enable: false,
                              speed: 40,
                              size_min: 0.1,
                              sync: false
                            }
                          },
                          line_linked: {
                            enable: false,
                            distance: 500,
                            color: "#ffffff",
                            opacity: 0.4,
                            width: 2
                          },
                          move: {
                            enable: true,
                            speed: 10,
                            direction: "bottom",
                            random: true,
                            straight: true,
                            out_mode: "out",
                            bounce: false,
                            attract: {
                              enable: false,
                              rotateX: 1200,
                              rotateY: 1200
                            }
                          }
                        }
                      }}
                    />
                  ) : null}
                </div>

                <div className="card-body row">
                  <div className="col-lg-4">
                    <div className="pfes-header-info">
                      <div>
                        <img
                          className="pfes-header-logo"
                          src={logo}
                          alt="PFES Logo"
                        />
                      </div>

                      <div className="pfes-header-text">
                        <div className="pfes-header-name">
                          <h3 className="">
                            {auth.user.firstName} {badge}
                          </h3>
                        </div>

                        <div className="pfes-header-date">
                          <span>
                            Today is {moment().format("MMM DD, YYYY")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="container col-lg-8">
                    <div className="row">
                      <div className="col-sm-6">
                        <Weather />
                      </div>

                      <div className="col-sm-6">
                        <ClocksContainer />
                      </div>
                    </div>
                  </div>
                </div>
              </label>
            </div>
            {/* FRONT END */}

            {/* BACK */}
            <div className="card mb-3 shadow-sm pfes-header-back pfes-card-side side-back">
              <label
                className="pfes-header-back-fix"
                htmlFor="flip"
                id="flip-label"
              >
                <div id="particles">
                  <Particles
                    params={{
                      particles: {
                        number: {
                          value: 20
                        },
                        opacity: {
                          value: 0.5
                        },
                        line_linked: {
                          color: "#fff",
                          opacity: 0.4,
                          width: 1
                        }
                      }
                    }}
                  />
                </div>

                <div className="card-body row text-white m-0 p-2 pt-3 pt-xl-2">
                  <div className="col-sm-6">
                    <div className="row">
                      <div className="col-xl-6">
                        <h3 className="">Your Information</h3>
                        <div>Username: {user.userName}</div>
                        <div>Firstname: {user.firstName}</div>
                        <div>Lastname: {user.lastName}</div>
                      </div>

                      <div className="col-xl-6">
                        <h3 className="d-none d-xl-block">&nbsp;</h3>
                        <div>User Type: {user.userType}</div>
                        <div>Email: {user.email}</div>
                        <div>Contact: {user.contact}</div>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6 mt-4 mt-sm-0">
                    <h3 className="">Your Stats</h3>
                    <div title={moment(user.date).format("MMMM Do YYYY")}>
                      Date User Added: {moment(user.date).format("MM/DD/YYYY")}
                    </div>

                    {user.userType === "sales" ? (
                      <React.Fragment>
                        <div>Total Job Orders: {user.logsAdded}</div>
                        <div>Job Orders Completed: {user.logsCompleted}</div>
                      </React.Fragment>
                    ) : user.userType === "operations" ? (
                      <div>Job Orders Delivered: {user.logsCompleted}</div>
                    ) : null}
                  </div>

                  {/* <div className="col-sm-2">3</div> */}
                </div>
              </label>
            </div>
            {/* BACK END */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  weather: state.weather
});

export default connect(
  mapStateToProps,
  null
)(ApplicationHeader);
