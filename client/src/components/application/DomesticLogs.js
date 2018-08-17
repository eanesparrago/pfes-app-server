import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import moment from "moment";
import DomesticLogCreate from "./DomesticLogCreate";
import isEmpty from "../../validation/is-empty";

import classnames from "classnames";

import { openLogView } from "../../actions/logsActions";

import logSorting from "../../utils/logSorting";

import "./Logs.css";

class DomesticLogs extends Component {
  constructor(props) {
    super(props);

    // @state
    this.state = {
      sortKey: "domJo",
      sortOrder: true
    };

    this.onClickSort = this.onClickSort.bind(this);
  }

  onClickSort(sortKey) {
    if (sortKey === this.state.sortKey) {
      this.setState({
        sortOrder: !this.state.sortOrder
      });
    } else if (sortKey !== this.state.sortKey) {
      this.setState({
        sortKey: sortKey,
        sortOrder: false
      });
    }
  }

  render() {
    const { auth, logs } = this.props;
    const { sortKey, sortOrder } = this.state;

    const logList = logs.sort(logSorting(sortKey, sortOrder));

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
          {logList.map(log => {
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

                <td>
                  {log.origin.location}, {log.origin.city},{" "}
                  {log.origin.provinceName}
                </td>
                <td>
                  {log.destination.location}, {log.destination.city},{" "}
                  {log.destination.provinceName}
                </td>

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

        {/* @table */}
        {/* //////////////////////// TABLE //////////////////////// */}
        <div className="mt-3 table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th
                  className="text-nowrap"
                  scope="col"
                  style={{ width: "5rem" }}
                >
                  #&nbsp;
                  <i
                    className={classnames("far fa-caret-square-down", {
                      "text-primary": sortKey === "domJo",
                      "text-secondary": sortKey !== "domJo",
                      "fas fa-caret-square-down":
                        sortKey === "domJo" && sortOrder === false,
                      "fas fa-caret-square-up":
                        sortKey === "domJo" && sortOrder === true
                    })}
                    onClick={() => this.onClickSort("domJo")}
                  />
                </th>

                <th
                  className="text-nowrap"
                  scope="col"
                  style={{ width: "9rem" }}
                >
                  Associate&nbsp;
                  <i
                    className={classnames("far fa-caret-square-down", {
                      "text-primary": sortKey === "associate",
                      "text-secondary": sortKey !== "associate",
                      "fas fa-caret-square-down":
                        sortKey === "associate" && sortOrder === false,
                      "fas fa-caret-square-up":
                        sortKey === "associate" && sortOrder === true
                    })}
                    onClick={() => this.onClickSort("associate")}
                  />
                </th>

                <th
                  className="text-nowrap"
                  scope="col"
                  style={{ width: "9rem" }}
                >
                  Shipper&nbsp;
                  <i
                    className={classnames("far fa-caret-square-down", {
                      "text-primary": sortKey === "shipperConsignee",
                      "text-secondary": sortKey !== "shipperConsignee",
                      "fas fa-caret-square-down":
                        sortKey === "shipperConsignee" && sortOrder === false,
                      "fas fa-caret-square-up":
                        sortKey === "shipperConsignee" && sortOrder === true
                    })}
                    onClick={() => this.onClickSort("shipperConsignee")}
                  />
                </th>

                <th
                  className="text-nowrap"
                  scope="col"
                  style={{ width: "9rem" }}
                >
                  Commodity&nbsp;
                  <i
                    className={classnames("far fa-caret-square-down", {
                      "text-primary": sortKey === "commodity",
                      "text-secondary": sortKey !== "commodity",
                      "fas fa-caret-square-down":
                        sortKey === "commodity" && sortOrder === false,
                      "fas fa-caret-square-up":
                        sortKey === "commodity" && sortOrder === true
                    })}
                    onClick={() => this.onClickSort("commodity")}
                  />
                </th>

                <th
                  className="text-nowrap"
                  scope="col"
                  title="Mode of Transport"
                  style={{ width: "5rem" }}
                >
                  MOT&nbsp;
                  <i
                    className={classnames("far fa-caret-square-down", {
                      "text-primary": sortKey === "modeOfTransport",
                      "text-secondary": sortKey !== "modeOfTransport",
                      "fas fa-caret-square-down":
                        sortKey === "modeOfTransport" && sortOrder === false,
                      "fas fa-caret-square-up":
                        sortKey === "modeOfTransport" && sortOrder === true
                    })}
                    onClick={() => this.onClickSort("modeOfTransport")}
                  />
                </th>

                <th
                  className="text-nowrap"
                  scope="col"
                  style={{ width: "9rem" }}
                >
                  BL/AWB#&nbsp;
                  <i
                    className={classnames("far fa-caret-square-down", {
                      "text-primary": sortKey === "blAwb",
                      "text-secondary": sortKey !== "blAwb",
                      "fas fa-caret-square-down":
                        sortKey === "blAwb" && sortOrder === false,
                      "fas fa-caret-square-up":
                        sortKey === "blAwb" && sortOrder === true
                    })}
                    onClick={() => this.onClickSort("blAwb")}
                  />
                </th>

                <th
                  className="text-nowrap"
                  scope="col"
                  style={{ minWidth: "10rem" }}
                >
                  Origin&nbsp;
                  <i
                    className={classnames("far fa-caret-square-down", {
                      "text-primary": sortKey === "origin",
                      "text-secondary": sortKey !== "origin",
                      "fas fa-caret-square-down":
                        sortKey === "origin" && sortOrder === false,
                      "fas fa-caret-square-up":
                        sortKey === "origin" && sortOrder === true
                    })}
                    onClick={() => this.onClickSort("origin")}
                  />
                </th>

                <th
                  className="text-nowrap"
                  scope="col"
                  style={{ minWidth: "10rem" }}
                >
                  Destination&nbsp;
                  <i
                    className={classnames("far fa-caret-square-down", {
                      "text-primary": sortKey === "destination",
                      "text-secondary": sortKey !== "destination",
                      "fas fa-caret-square-down":
                        sortKey === "destination" && sortOrder === false,
                      "fas fa-caret-square-up":
                        sortKey === "destination" && sortOrder === true
                    })}
                    onClick={() => this.onClickSort("destination")}
                  />
                </th>

                <th
                  className="text-nowrap"
                  scope="col"
                  style={{ width: "7rem" }}
                >
                  ETD&nbsp;
                  <i
                    className={classnames("far fa-caret-square-down", {
                      "text-primary": sortKey === "etd",
                      "text-secondary": sortKey !== "etd",
                      "fas fa-caret-square-down":
                        sortKey === "etd" && sortOrder === false,
                      "fas fa-caret-square-up":
                        sortKey === "etd" && sortOrder === true
                    })}
                    onClick={() => this.onClickSort("etd")}
                  />
                </th>

                <th
                  className="text-nowrap"
                  scope="col"
                  style={{ width: "7rem" }}
                >
                  ETA&nbsp;
                  <i
                    className={classnames("far fa-caret-square-down", {
                      "text-primary": sortKey === "eta",
                      "text-secondary": sortKey !== "eta",
                      "fas fa-caret-square-down":
                        sortKey === "eta" && sortOrder === false,
                      "fas fa-caret-square-up":
                        sortKey === "eta" && sortOrder === true
                    })}
                    onClick={() => this.onClickSort("eta")}
                  />
                </th>

                <th
                  className="text-nowrap"
                  scope="col"
                  style={{ width: "7rem" }}
                >
                  Status&nbsp;
                  <i
                    className={classnames("far  fa-caret-square-down", {
                      "text-primary": sortKey === "status",
                      "text-secondary": sortKey !== "status",
                      "fas fa-caret-square-down":
                        sortKey === "status" && sortOrder === false,
                      "fas fa-caret-square-up":
                        sortKey === "status" && sortOrder === true
                    })}
                    onClick={() => this.onClickSort("status")}
                  />
                </th>

                <th
                  className="text-nowrap"
                  scope="col"
                  style={{ width: "7rem" }}
                >
                  Tags
                </th>
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
