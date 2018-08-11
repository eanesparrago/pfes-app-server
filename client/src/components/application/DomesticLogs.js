import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import moment from "moment";
import DomesticLogCreate from "./DomesticLogCreate";
import isEmpty from "../../validation/is-empty";

import { openLogView } from "../../actions/logsActions";

import "./Logs.css";

class DomesticLogs extends Component {
  render() {
    const { auth, logs } = this.props;

    let tableBody;

    if (isEmpty(logs)) {
      tableBody = (
        <tbody>
          <tr>
            <td colSpan="11">Empty</td>
          </tr>
        </tbody>
      );
    } else {
      tableBody = (
        <tbody>
          {logs.map(log => {
            const { preloading, loading, unloading } = log.operations;
            let operationsStatus = "Preloading";
            let operationsStatusRemarks = "No remarks";

            if (preloading.statuses[0])
              operationsStatusRemarks =
                preloading.statuses[0].comment;

            if (preloading.isFinished === true) {
              operationsStatus = "Loading";

              if (loading.statuses[0])
                operationsStatusRemarks =
                  loading.statuses[0].comment;

              if (loading.isFinished === true) {
                operationsStatus = "Unloading";

                if (unloading.statuses[0])
                  operationsStatusRemarks =
                    unloading.statuses[0].comment;

                if (unloading.isFinished === true) {
                  operationsStatus = "Delivered";

                  operationsStatusRemarks = unloading.remarks;
                }
              }
            }

            return (
              <tr
                key={log._id}
                data-toggle="modal"
                data-target="#LogView"
                onClick={() => this.props.openLogView(log)}
                className="fade-in pointer"
              >
                <td>
                  {log.type.slice(0, 1)}-{log.domJo}
                </td>

                {/* If the logged in user is the associate, set color to blue */}
                {auth.user.id === log.user ? (
                  <td>
                    <span className="text-primary">{log.associate}</span>
                  </td>
                ) : (
                  <td>{log.associate}</td>
                )}

                <td>{log.shipperConsignee}</td>
                <td>{log.commodity}</td>
                <td>{log.modeOfTransport}</td>
                <td>{log.blAwb ? log.blAwb : "n/a"}</td>
                <td>{log.origin}</td>
                <td>{log.destination}</td>
                <td title={moment(log.etd).format("MMMM Do YYYY")}>
                  <Moment format="MM/DD/YYYY">{log.etd}</Moment>
                </td>
                <td title={moment(log.eta).format("MMMM Do YYYY")}>
                  <Moment format="MM/DD/YYYY">{log.eta}</Moment>
                </td>
                <td title={operationsStatusRemarks}>
                  {log.status} ({operationsStatus})
                </td>
              </tr>
            );
          })}
        </tbody>
      );
    }

    return (
      <div className="">
        {/* //////////////////////// NAVBAR //////////////////////// */}
        <nav className="logs-nav navbar navbar-expand-lg navbar-light ">
          <a className="navbar-brand">Domestic</a>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#domesticNavbar"
            aria-controls="domesticNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="domesticNavbar">
            {auth.user.userType === "admin" ||
            auth.user.userType === "sales" ? (
              <DomesticLogCreate />
            ) : null}

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
        <div className="mt-3 table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">D-JO</th>
                <th scope="col">Associate</th>
                <th scope="col">Shipper/Consignee</th>
                <th scope="col">Commodity</th>
                <th scope="col">Mode of Transport</th>
                <th scope="col">BL/AWB#</th>
                <th scope="col">Origin</th>
                <th scope="col">Destination</th>
                <th scope="col">ETD</th>
                <th scope="col">ETA</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            {tableBody}
          </table>
        </div>
      </div>
    );
  }
}

DomesticLogs.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { openLogView }
)(DomesticLogs);
