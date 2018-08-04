import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import DomesticLogCreate from "./DomesticLogCreate";
import isEmpty from "../../validation/is-empty";

import { openLogView } from "../../actions/logsActions";

import "./Logs.css";

class DomesticLogs extends Component {
  render() {
    const { auth, logs } = this.props;

    let tableBody;

    if (isEmpty(logs)) {
      tableBody = <p>Empty</p>;
    } else {
      tableBody = (
        <tbody>
          {logs.map(log => {
            return (
              <tr
                key={log._id}
                data-toggle="modal"
                data-target="#LogView"
                onClick={() => this.props.openLogView(log)}
              >
                <td>
                  {log.type.slice(0, 1)}-{log.domJo}
                </td>
                <td>{log.associate}</td>
                <td>{log.shipperConsignee}</td>
                <td>{log.modeOfTransport}</td>
                <td>{log.commodity}</td>
                <td>{log.blAwb}</td>
                <td>{log.origin}</td>
                <td>{log.destination}</td>
                <td>
                  <Moment format="YYYY-MM-DD">{log.etd}</Moment>
                </td>
                <td>
                  <Moment format="YYYY-MM-DD">{log.eta}</Moment>
                </td>
                <td>{log.status}</td>
              </tr>
            );
          })}
        </tbody>
      );
    }

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
