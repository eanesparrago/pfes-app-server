import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DomesticLogCreate from "./DomesticLogCreate";

import { getDomesticLogs } from "../../actions/logsActions";

import spinner from "../../img/spinner.gif";

import "./Logs.css";

class DomesticLogs extends Component {
  constructor() {
    super();
    this.state = {
      domesticLogs: [],
      loading: true
    };
  }
  componentDidMount() {
    this.props.getDomesticLogs();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.domesticLogs) {
      this.setState({ domesticLogs: nextProps.domesticLogs, loading: false });
    }
  }

  render() {
    const { domesticLogs, loading } = this.state;

    const tableBody = domesticLogs.map(log => {
      return (
        <tr key={log._id}>
          <td>{log.domJo}</td>
          <td>{log.associate}</td>
          <td>{log.shipperConsignee}</td>
          <td>{log.modeOfTransport}</td>
          <td>{log.commodity}</td>
          <td>{log.blAwb}</td>
          <td>{log.origin}</td>
          <td>{log.destination}</td>
          <td>{log.etd}</td>
          <td>{log.eta}</td>
          <td>{log.status}</td>
        </tr>
      );
    });

    console.log(this.state);
    return (
      <div className="">
        {/* //////////////////////// NAVBAR //////////////////////// */}
        <nav className="container logs-nav navbar navbar-expand-lg navbar-light ">
          <a className="navbar-brand">Domestic</a>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <button className="btn btn-primary mr-3" type="button">
              New Job Order
            </button> */}

            <DomesticLogCreate />
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-primary my-2 my-sm-0"
                // type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </nav>

        {/* //////////////////////// TABLE //////////////////////// */}
        {loading ? (
          <div className="text-center">
            <img src={spinner} alt="Loading spinner" />
          </div>
        ) : (
          <div className="mt-3 table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">D-JO</th>
                  <th scope="col">Associate</th>
                  <th scope="col">Shipper/Consignee</th>
                  <th scope="col">Mode of Transport</th>
                  <th scope="col">Commodity</th>
                  <th scope="col">BL/AWB</th>
                  <th scope="col">Origin</th>
                  <th scope="col">Destination</th>
                  <th scope="col">ETD</th>
                  <th scope="col">ETA</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>{tableBody}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  domesticLogs: state.domesticLogs
});

export default connect(
  mapStateToProps,
  { getDomesticLogs }
)(DomesticLogs);
