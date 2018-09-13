import React, { Component } from "react";
import { connect } from "react-redux";

import moment from "moment";
import logo from "../../img/pfes-logo.png";
import generateBadge from "../../utils/generateBadge";

import Weather from "./weather/Weather";
import ClocksContainer from "./clocks/ClocksContainer";

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

    const badge = generateBadge(auth.user.userType);

    return (
      <div className="pfes-card-container mb-3">
        <div className="pfes-card-body">
          {/* FRONT */}
          <div className="card mb-3 shadow-sm pfes-header pfes-card-side side-front">
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
                      <span>Today is {moment().format("MMM DD, YYYY")}</span>
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
          </div>
          {/* FRONT END */}

          {/* BACK */}
          <div className="card mb-3 shadow-sm pfes-header-back pfes-card-side side-back">
            <div className="card-body row text-white">
              <div className="col-12">TEST</div>
            </div>
          </div>
          {/* BACK END */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(ApplicationHeader);
