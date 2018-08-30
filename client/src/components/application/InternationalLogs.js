import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import moment from "moment";
import InternationalLogCreate from "./InternationalLogCreate";
import isEmpty from "../../validation/is-empty";
import classnames from "classnames";
import ReactToPrint from "react-to-print";
import { CSVLink } from "react-csv";

import { openLogView } from "../../actions/logsActions";

import logSorting from "../../utils/logSorting";
import logSearching from "../../utils/logSearching";
import generateCSV from "../../utils/generateCSV";

import logo from "../../img/pfes-logo.png";

import "./Logs.css";

class InternationalLogs extends Component {
  constructor(props) {
    super(props);

    // @state
    this.state = {
      sortKey: "domJo",
      sortOrder: true,

      searchValue: "",
      searchCategory: "all"
    };

    this.onClickSort = this.onClickSort.bind(this);
    this.onChangeSearchValue = this.onChangeSearchValue.bind(this);
    this.onChangeSearchCategory = this.onChangeSearchCategory.bind(this);

    this.toPrint = React.createRef();
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

  onChangeSearchValue(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeSearchCategory(e) {
    this.setState({
      searchValue: "",
      searchCategory: e.target.value
    });
  }

  render() {
    const { auth, logs } = this.props;
    const { sortKey, sortOrder, searchValue, searchCategory } = this.state;

    let logList = logs;

    if (searchValue !== "") {
      logList = logSearching(logList, searchCategory, searchValue);
    }

    logList = logList.sort(logSorting(sortKey, sortOrder));

    // Generate CSV
    const logsCSV = generateCSV(logList, "international");

    // Generate logs table body
    let tableBody;

    if (isEmpty(logList)) {
      tableBody = (
        <tbody>
          <tr>
            <td className="text-center" colSpan="12">
              <em className="text-muted">No logs found</em>
            </td>
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
                <td className="text-nowrap">
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

                <td>
                  {log.commodity.type ? `${log.commodity.type},` : null}{" "}
                  {log.commodity.description}
                </td>

                <td>{log.modeOfTransport}</td>
                <td>{log.blAwb ? log.blAwb : "n/a"}</td>

                <td>
                  {log.origin.location}, {log.origin.country}
                </td>

                <td>
                  {log.destination.location}, {log.destination.country}
                </td>

                <td title={moment(log.etd).format("MMMM Do YYYY")}>
                  <Moment format="MM/DD/YYYY">{log.etd}</Moment>
                </td>
                <td title={moment(log.eta).format("MMMM Do YYYY")}>
                  <Moment format="MM/DD/YYYY">{log.eta}</Moment>
                </td>

                <td>
                  <span
                    className={classnames("", {
                      "text-success": log.isCompleted
                    })}
                  >
                    {log.status}
                  </span>{" "}
                  {!log.isCompleted ? (
                    <span title={operationsStatusRemarks}>
                      {operationsStatus}
                    </span>
                  ) : null}
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
      <div className="mx-3 mobile-margin">
        {/* //////////////////////// NAVBAR //////////////////////// */}
        <nav className="logs-nav navbar navbar-expand-lg navbar-light">
          <span className="navbar-brand">International Job Orders</span>

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

          {/* @navbar */}
          <div className="collapse navbar-collapse" id="internationalNavbar">
            {auth.user.userType === "admin" ||
            auth.user.userType === "sales" ? (
              <InternationalLogCreate />
            ) : null}

            {/* @search */}
            <div className="input-group my-2 my-lg-0 mr-2">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-search" />
                </span>
              </div>

              <select
                className="custom-select"
                name="searchCategory"
                id="searchCategory"
                value={this.state.searchCategory}
                onChange={this.onChangeSearchCategory}
              >
                <option value="all" defaultValue>
                  All Categories
                </option>
                <option value="domJo">Job Order #</option>
                <option value="associate">Associate</option>
                <option value="shipperConsignee">Shipper</option>
                <option value="commodity">Commodity</option>
                <option value="modeOfTransport">Mode of Transport</option>
                <option value="blAwb">BL/AWB#</option>
                <option value="originLocation">Origin Address</option>
                <option value="originCountry">Origin Country</option>
                <option value="destinationLocation">Destination Address</option>
                <option value="destinationCountry">Destination Country</option>
                <option value="etd">ETD</option>
                <option value="eta">ETA</option>
                <option value="status">Status</option>
                <option value="tags">Tags</option>
              </select>
            </div>

            <div className="input-group mr-3">
              {(() => {
                switch (searchCategory) {
                  case "domJo":
                    return (
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Log #"
                        name="searchValue"
                        value={this.state.searchValue}
                        onChange={this.onChangeSearchValue}
                      />
                    );

                  case "modeOfTransport":
                    return (
                      <select
                        className="custom-select"
                        name="searchValue"
                        id="searchValue"
                        value={this.state.searchValue}
                        onChange={this.onChangeSearchValue}
                      >
                        <option value="" defaultValue>
                          All Mode of Transport
                        </option>
                        <option value="Sea">Sea</option>
                        <option value="Air">Air</option>
                      </select>
                    );

                  case "status":
                    return (
                      <select
                        className="custom-select"
                        name="searchValue"
                        id="searchValue"
                        value={this.state.searchValue}
                        onChange={this.onChangeSearchValue}
                      >
                        <option value="" defaultValue>
                          All Statuses
                        </option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Complete">Complete</option>
                        <option value="Waiting">Waiting</option>
                        <option value="Void">Void</option>
                      </select>
                    );

                  case "etd":
                  case "eta":
                    return (
                      <input
                        type="date"
                        className="custom-select mr-2"
                        name="searchValue"
                        value={this.state.searchValue}
                        onChange={this.onChangeSearchValue}
                      />
                    );

                  case "tags":
                    return (
                      <select
                        className="custom-select"
                        name="searchValue"
                        id="searchValue"
                        value={this.state.searchValue}
                        onChange={this.onChangeSearchValue}
                      >
                        <option value="" defaultValue>
                          All Tags
                        </option>
                        <option value="urgent">Urgent</option>
                        <option value="insured">Insured</option>
                      </select>
                    );

                  default:
                    return (
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Search input with dropdown button"
                        placeholder="Enter Search Value"
                        name="searchValue"
                        value={this.state.searchValue}
                        onChange={this.onChangeSearchValue}
                      />
                    );
                }
              })()}
            </div>

            {/* @print */}
            <ReactToPrint
              trigger={() => (
                <button
                  title="Print Log"
                  type="button"
                  className="btn btn-outline-primary shadow-sm mt-2 mt-lg-0 mr-2"
                >
                  <i className="fas fa-print" />
                </button>
              )}
              content={() => this.toPrint.current}
            />

            {/* @csv */}
            <CSVLink
              data={logsCSV}
              filename={"pfes-international-logs-csv.csv"}
            >
              <button
                title="Export CSV"
                type="button"
                className="btn btn-outline-primary shadow-sm mt-2 mt-lg-0"
              >
                <i className="fas fa-file-export" />
              </button>
            </CSVLink>
          </div>
        </nav>

        {/* @table */}
        {/* //////////////////////// TABLE //////////////////////// */}
        <div className="mt-3 table-responsive">
          <div className="pfes-print-container" ref={this.toPrint}>
            <div className="pfes-print-element">
              <div>
                <img
                  src={logo}
                  alt="Logo print"
                  style={{ width: "10rem", height: "auto", margin: "1rem" }}
                />
              </div>
              <h2>International Logs</h2>
            </div>

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
                      className={classnames(
                        "far fa-caret-square-down pfes-print-hide",
                        {
                          "text-primary": sortKey === "domJo",
                          "text-secondary": sortKey !== "domJo",
                          "fas fa-caret-square-down":
                            sortKey === "domJo" && sortOrder === false,
                          "fas fa-caret-square-up":
                            sortKey === "domJo" && sortOrder === true
                        }
                      )}
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
                      className={classnames(
                        "far fa-caret-square-down pfes-print-hide",
                        {
                          "text-primary": sortKey === "associate",
                          "text-secondary": sortKey !== "associate",
                          "fas fa-caret-square-down":
                            sortKey === "associate" && sortOrder === false,
                          "fas fa-caret-square-up":
                            sortKey === "associate" && sortOrder === true
                        }
                      )}
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
                      className={classnames(
                        "far fa-caret-square-down pfes-print-hide",
                        {
                          "text-primary": sortKey === "shipperConsignee",
                          "text-secondary": sortKey !== "shipperConsignee",
                          "fas fa-caret-square-down":
                            sortKey === "shipperConsignee" &&
                            sortOrder === false,
                          "fas fa-caret-square-up":
                            sortKey === "shipperConsignee" && sortOrder === true
                        }
                      )}
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
                      className={classnames(
                        "far fa-caret-square-down pfes-print-hide",
                        {
                          "text-primary": sortKey === "commodity",
                          "text-secondary": sortKey !== "commodity",
                          "fas fa-caret-square-down":
                            sortKey === "commodity" && sortOrder === false,
                          "fas fa-caret-square-up":
                            sortKey === "commodity" && sortOrder === true
                        }
                      )}
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
                      className={classnames(
                        "far fa-caret-square-down pfes-print-hide",
                        {
                          "text-primary": sortKey === "modeOfTransport",
                          "text-secondary": sortKey !== "modeOfTransport",
                          "fas fa-caret-square-down":
                            sortKey === "modeOfTransport" &&
                            sortOrder === false,
                          "fas fa-caret-square-up":
                            sortKey === "modeOfTransport" && sortOrder === true
                        }
                      )}
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
                      className={classnames(
                        "far fa-caret-square-down pfes-print-hide",
                        {
                          "text-primary": sortKey === "blAwb",
                          "text-secondary": sortKey !== "blAwb",
                          "fas fa-caret-square-down":
                            sortKey === "blAwb" && sortOrder === false,
                          "fas fa-caret-square-up":
                            sortKey === "blAwb" && sortOrder === true
                        }
                      )}
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
                      className={classnames(
                        "far fa-caret-square-down pfes-print-hide",
                        {
                          "text-primary": sortKey === "origin",
                          "text-secondary": sortKey !== "origin",
                          "fas fa-caret-square-down":
                            sortKey === "origin" && sortOrder === false,
                          "fas fa-caret-square-up":
                            sortKey === "origin" && sortOrder === true
                        }
                      )}
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
                      className={classnames(
                        "far fa-caret-square-down pfes-print-hide",
                        {
                          "text-primary": sortKey === "destination",
                          "text-secondary": sortKey !== "destination",
                          "fas fa-caret-square-down":
                            sortKey === "destination" && sortOrder === false,
                          "fas fa-caret-square-up":
                            sortKey === "destination" && sortOrder === true
                        }
                      )}
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
                      className={classnames(
                        "far fa-caret-square-down pfes-print-hide",
                        {
                          "text-primary": sortKey === "etd",
                          "text-secondary": sortKey !== "etd",
                          "fas fa-caret-square-down":
                            sortKey === "etd" && sortOrder === false,
                          "fas fa-caret-square-up":
                            sortKey === "etd" && sortOrder === true
                        }
                      )}
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
                      className={classnames(
                        "far fa-caret-square-down pfes-print-hide",
                        {
                          "text-primary": sortKey === "eta",
                          "text-secondary": sortKey !== "eta",
                          "fas fa-caret-square-down":
                            sortKey === "eta" && sortOrder === false,
                          "fas fa-caret-square-up":
                            sortKey === "eta" && sortOrder === true
                        }
                      )}
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
                      className={classnames(
                        "far  fa-caret-square-down pfes-print-hide",
                        {
                          "text-primary": sortKey === "status",
                          "text-secondary": sortKey !== "status",
                          "fas fa-caret-square-down":
                            sortKey === "status" && sortOrder === false,
                          "fas fa-caret-square-up":
                            sortKey === "status" && sortOrder === true
                        }
                      )}
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
