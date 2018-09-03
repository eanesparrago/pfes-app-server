import React, { Component } from "react";
import MediaQuery from "react-responsive";
import moment from "moment";
import { connect } from "react-redux";

import Spinner from "../../common/Spinner";

import { Line, Bar } from "react-chartjs-2";
import generateChartData from "../../../utils/generateChartData";
import { logoutUser } from "../../../actions/authActions";

class Statistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment().format("YYYY-MM")
    };

    this.onChangeDate = this.onChangeDate.bind(this);
  }

  componentDidMount() {
    // Logout if token has expired
    const currentTime = Date.now() / 1000;
    if (this.props.auth.user.exp < currentTime) {
      this.props.logoutUser();
    }
  }

  onChangeDate(e) {
    if (e.target.value === "") {
      this.setState({ date: moment().format("YYYY-MM") });
    } else {
      this.setState({ date: e.target.value });
    }
  }

  render() {
    const { date } = this.state;
    const { log } = this.props;

    let content;

    if (log.domestic === null || log.international === null || log.loading) {
      content = <Spinner />;
    } else {
      const {
        completedData,
        transportData,
        domesticAssociatesResult,
        internationalAssociatesResult,
        domesticShippersResult,
        internationalShippersResult
      } = generateChartData(log, date);

      const renderDate = moment(date).format("MMMM, YYYY");
      const renderYear = moment(date).format("YYYY");

      const renderDomesticAssociates = domesticAssociatesResult.map(
        (shipper, index) => {
          return (
            <li
              key={index}
              className="fade-in list-group-item d-flex justify-content-between align-items-center"
            >
              {shipper[0]}{" "}
              <span className="badge badge-primary badge-pill">
                {shipper[1].toString()}
              </span>
            </li>
          );
        }
      );

      const renderInternationalAssociates = internationalAssociatesResult.map(
        (shipper, index) => {
          return (
            <li
              key={index}
              className="fade-in list-group-item d-flex justify-content-between align-items-center"
            >
              {shipper[0]}{" "}
              <span className="badge badge-primary badge-pill">
                {shipper[1].toString()}
              </span>
            </li>
          );
        }
      );

      const renderDomesticShippers = domesticShippersResult.map(
        (shipper, index) => {
          return (
            <li
              key={index}
              className="fade-in list-group-item d-flex justify-content-between align-items-center"
            >
              {shipper[0]}{" "}
              <span className="badge badge-primary badge-pill">
                {shipper[1].toString()}
              </span>
            </li>
          );
        }
      );

      const renderInternationalShippers = internationalShippersResult.map(
        (shipper, index) => {
          return (
            <li
              key={index}
              className="fade-in list-group-item d-flex justify-content-between align-items-center"
            >
              {shipper[0]}{" "}
              <span className="badge badge-primary badge-pill">
                {shipper[1].toString()}
              </span>
            </li>
          );
        }
      );

      content = (
        <div className="fade-in mx-3 mobile-margin">
          <nav className="logs-nav navbar navbar-expand-sm navbar-light mb-3">
            <span className="navbar-brand">Log Statistics</span>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#statisticsNavbar"
              aria-controls="statisticsNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            {/* @navbar */}
            <div className="collapse navbar-collapse" id="statisticsNavbar">
              <input
                type="month"
                style={{ maxWidth: "30rem" }}
                className="form-control form-control"
                name="date"
                value={date}
                onChange={this.onChangeDate}
                min="2018-01"
                max={moment().format("YYYY-MM")}
              />
            </div>
          </nav>

          <div className="row">
            <div className="col-lg-6">
              <MediaQuery minWidth={601}>
                <div className="card shadow-sm mb-3">
                  <div className="card-body text-center">
                    <h3>Completed Job Orders in Year {renderYear}</h3>

                    <Line data={completedData} />
                  </div>
                </div>
              </MediaQuery>

              <MediaQuery maxWidth={600}>
                <div className="mb-4">
                  <div className="text-center">
                    <h3>Completed Job Orders in Year {renderYear}</h3>

                    <Line data={completedData} height={220} />
                  </div>

                  <div className="dropdown-divider" />
                </div>
              </MediaQuery>
            </div>

            <div className="col-lg-6">
              <MediaQuery minWidth={601}>
                <div className="card shadow-sm mb-3">
                  <div className="card-body text-center">
                    <h3>Modes of Transport in {renderDate}</h3>

                    <Bar data={transportData} />
                  </div>
                </div>
              </MediaQuery>

              <MediaQuery maxWidth={600}>
                <div className="mb-4">
                  <div className="text-center">
                    <h3>Modes of Transport in {renderDate}</h3>

                    <Bar data={transportData} height={220} />
                  </div>

                  <div className="dropdown-divider" />
                </div>
              </MediaQuery>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <MediaQuery minWidth={601}>
                <div className="card shadow-sm mb-3">
                  <div className="card-body text-center">
                    <h3>Shippers in {renderDate}</h3>

                    <div className="row">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <h4>Domestic</h4>

                        <ul className="list-group">{renderDomesticShippers}</ul>
                      </div>

                      <div className="col-md-6">
                        <h4>International</h4>

                        <ul className="list-group">
                          {renderInternationalShippers}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </MediaQuery>

              <MediaQuery maxWidth={600}>
                <div className="mb-4">
                  <div className="text-center">
                    <h3>Shippers in {renderDate}</h3>

                    <div className="row">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <h4>Domestic</h4>

                        <ul className="list-group">{renderDomesticShippers}</ul>
                      </div>

                      <div className="col-md-6">
                        <h4>International</h4>

                        <ul className="list-group">
                          {renderInternationalShippers}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="dropdown-divider" />
                </div>
              </MediaQuery>
            </div>

            <div className="col-lg-6">
              <MediaQuery minWidth={601}>
                <div className="card shadow-sm mb-3">
                  <div className="card-body text-center">
                    <h3>Associates in {renderDate}</h3>

                    <div className="row">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <h4>Domestic</h4>

                        <ul className="list-group fade-in">
                          {renderDomesticAssociates}
                        </ul>
                      </div>

                      <div className="col-md-6">
                        <h4>International</h4>

                        <ul className="list-group">
                          {renderInternationalAssociates}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </MediaQuery>

              <MediaQuery maxWidth={600}>
                <div className="mb-4">
                  <div className="text-center">
                    <h3>Associates in {renderDate}</h3>

                    <div className="row">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <h4>Domestic</h4>

                        <ul className="list-group">
                          {renderDomesticAssociates}
                        </ul>
                      </div>

                      <div className="col-md-6">
                        <h4>International</h4>

                        <ul className="list-group">
                          {renderInternationalAssociates}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="dropdown-divider" />
                </div>
              </MediaQuery>
            </div>
          </div>
        </div>
      );
    }
    return <div>{content}</div>;
  }
}

const mapStateToProps = state => ({
  log: state.log,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Statistics);
