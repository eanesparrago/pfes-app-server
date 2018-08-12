import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import moment from "moment";
import InternationalLogCreate from "./InternationalLogCreate";
import isEmpty from "../../validation/is-empty";

import classnames from "classnames";

import { openLogView } from "../../actions/logsActions";

import "./Logs.css";

class InternationalLogs extends Component {
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
            /* Generate the operations status element */
            const { preloading, loading, unloading } = log.operations;

            let operationsStatus = (
              <span className="badge badge-primary">Preloading</span>
            );

            let operationsStatusRemarks = "No status";

            if (preloading.statuses[0]) {
              operationsStatusRemarks = preloading.statuses[0].comment;

              operationsStatus = (
                <span
                  className={classnames("badge", {
                    "badge-info": preloading.statuses[0].type === "Info",
                    "badge-warning": preloading.statuses[0].type === "Warning",
                    "badge-danger": preloading.statuses[0].type === "Problem"
                  })}
                >
                  Preloading
                </span>
              );
            }

            if (preloading.isFinished === true) {
              operationsStatus = (
                <span className="badge badge-primary">Loading</span>
              );

              if (loading.statuses[0]) {
                operationsStatusRemarks = loading.statuses[0].comment;

                operationsStatus = (
                  <span
                    className={classnames("badge", {
                      "badge-info": loading.statuses[0].type === "Info",
                      "badge-warning": loading.statuses[0].type === "Warning",
                      "badge-danger": loading.statuses[0].type === "Problem"
                    })}
                  >
                    Loading
                  </span>
                );
              } else {
                operationsStatusRemarks = "No status";
              }

              if (loading.isFinished === true) {
                operationsStatus = (
                  <span className="badge badge-primary">Unloading</span>
                );

                if (unloading.statuses[0]) {
                  operationsStatusRemarks = unloading.statuses[0].comment;
                  operationsStatus = (
                    <span
                      className={classnames("badge", {
                        "badge-info": unloading.statuses[0].type === "Info",
                        "badge-warning":
                          unloading.statuses[0].type === "Warning",
                        "badge-danger": unloading.statuses[0].type === "Problem"
                      })}
                    >
                      Unloading
                    </span>
                  );
                } else {
                  operationsStatusRemarks = "No status";
                }

                if (unloading.isFinished === true) {
                  operationsStatus = (
                    <span className="badge badge-success">Delivered</span>
                  );

                  operationsStatusRemarks = unloading.remarks;
                }
              }
            }

            /* Generate the operations status icons */
            let operationsStatusIcons = [];

            if (log.tags.urgent) {
              operationsStatusIcons.push(
                <i
                  title="Urgent"
                  className="fas fa-exclamation text-danger mr-2"
                />
              );
            } else {
              operationsStatusIcons.push(
                <i className="invisible fas fa-exclamation text-danger mr-2" />
              );
            }

            if (log.tags.important) {
              operationsStatusIcons.push(
                <i
                  title="Important"
                  className="fas fa-star text-warning mr-2"
                />
              );
            } else {
              operationsStatusIcons.push(
                <i className="invisible fas fa-star text-warning mr-2" />
              );
            }

            if (log.tags.insured) {
              operationsStatusIcons.push(
                <i
                  title="Insured"
                  className="fas fa-shield-alt text-info mr-2"
                />
              );
            } else {
              operationsStatusIcons.push(
                <i className="invisible fas fa-shield-alt text-info mr-2" />
              );
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

                <td>
                  {log.status}{" "}
                  <span title={operationsStatusRemarks}>
                    {operationsStatus}
                  </span>
                </td>

                <td>
                  <span className="ml-2" style={{ whiteSpace: "nowrap" }}>
                    {operationsStatusIcons.map((icon, index) => {
                      return <span key={index}>{icon}</span>;
                    })}
                  </span>
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
        <nav className="logs-nav navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand">International</a>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#internationalNavbar"
            aria-controls="internationalNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="internationalNavbar">
            {auth.user.userType === "admin" ||
            auth.user.userType === "sales" ? (
              <InternationalLogCreate />
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
                <th scope="col">I-JO</th>
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
                <th scope="col">Tags</th>
              </tr>
            </thead>
            {tableBody}
          </table>
        </div>
      </div>
    );
  }
}

InternationalLogs.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { openLogView }
)(InternationalLogs);
