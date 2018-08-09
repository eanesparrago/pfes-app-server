import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import Moment from "react-moment";
import moment from "moment";

import {
  editLog,
  getDomesticLogs,
  getInternationalLogs,
  deleteLog
} from "../../actions/logsActions";

export class LogViewEdit extends Component {
  constructor() {
    super();
    this.state = {
      domJo: "",
      shipperConsignee: "",
      associate: "",
      modeOfTransport: "",
      commodity: "",
      blAwb: "",
      origin: "",
      destination: "",
      etd: "",
      eta: "",
      status: "Ongoing",
      type: "",
      rating: "",

      errors: {},
      isEditable: false
    };

    this.onChange = this.onChange.bind(this);
    this.enableEdit = this.enableEdit.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
    this.deleteLog = this.deleteLog.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors, isEditable: true });
    }

    if (nextProps.log) {
      this.setState({
        domJo: nextProps.log.domJo,
        shipperConsignee: nextProps.log.shipperConsignee,
        associate: nextProps.log.associate,
        modeOfTransport: nextProps.log.modeOfTransport,
        commodity: nextProps.log.commodity,
        blAwb: nextProps.log.blAwb,
        origin: nextProps.log.origin,
        destination: nextProps.log.destination,
        etd: moment(nextProps.log.etd).format("YYYY-MM-DD"),
        eta: moment(nextProps.log.eta).format("YYYY-MM-DD"),
        status: nextProps.log.status,
        type: nextProps.log.type,
        rating: nextProps.log.rating,

        isEditable: false
      });
    }
  }

  onChange(e) {
    if (e.target.name === "etd" || e.target.name === "eta") {
      this.setState({ [e.target.name]: e.target.value }, () => {
        const etd = Date.parse(moment(this.state.etd).format("DD MMM YYYY"));
        const eta = Date.parse(moment(this.state.eta).format("DD MMM YYYY"));

        console.log(etd, eta);

        if (etd > eta) {
          this.setState({ eta: this.state.etd });
          console.log("true");
        }
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  enableEdit() {
    this.setState({
      isEditable: true
    });
  }

  closeEdit() {
    const { log } = this.props;

    this.setState({
      domJo: log.domJo,
      shipperConsignee: log.shipperConsignee,
      associate: log.associate,
      modeOfTransport: log.modeOfTransport,
      commodity: log.commodity,
      blAwb: log.blAwb,
      origin: log.origin,
      destination: log.destination,
      etd: moment(log.etd).format("YYYY-MM-DD"),
      eta: moment(log.eta).format("YYYY-MM-DD"),
      status: log.status,
      type: log.type,
      rating: log.rating,

      isEditable: false
    });
  }

  submitEdit() {
    const log = {
      domJo: this.state.domJo,
      shipperConsignee: this.state.shipperConsignee,
      modeOfTransport: this.state.modeOfTransport,
      commodity: this.state.commodity,
      blAwb: this.state.blAwb,
      origin: this.state.origin,
      destination: this.state.destination,
      etd: this.state.etd,
      eta: this.state.eta,
      status: this.state.status, 
      type: this.state.type,
      rating: this.state.rating
    };

    this.props.editLog(log);
  }

  deleteLog() {
    this.props.deleteLog(this.props.log);
  }

  render() {
    const { errors, isEditable } = this.state;
    const { log, auth } = this.props;

    let editControls = null;

    let etaLimit;
    if (this.state.etd !== "") {
      etaLimit = moment(this.state.etd).format("YYYY-MM-DD");
    } else {
      etaLimit = moment().format("YYYY-MM-DD");
    }

    if (
      auth.user.userType === "admin" ||
      (auth.user.userType === "sales" && auth.user.id === log.user)
    ) {
      editControls = isEditable ? (
        <button
          type="button"
          className="btn btn-primary mr-2 mb-3"
          onClick={this.submitEdit}
        >
          Confirm
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-outline-primary mr-3 mb-3"
          onClick={this.enableEdit}
        >
          Edit Job Order
        </button>
      );
    }

    let deleteControl = null;
    if (auth.user.userType === "admin") {
      deleteControl = (
        <button
          className="btn btn-outline-danger mb-3"
          onClick={this.deleteLog}
          data-dismiss="modal"
        >
          Delete
        </button>
      );
    }

    return (
      <div>
        <div className="container row">
          <h2 className="mr-3">Details</h2>

          {editControls}

          {editControls !== null ? (
            isEditable ? (
              <button
                type="button"
                className="btn btn-secondary mb-3 mr-3"
                onClick={this.closeEdit}
              >
                &times;
              </button>
            ) : null
          ) : null}

          {deleteControl}
        </div>

        <form noValidate>
          <div className="row">
            {isEditable ? (
              <div className="form-group col-md-6">
                <label className="mb-1" htmlFor="associate">
                  Associate
                </label>
                <input
                  readOnly
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.associate
                  })}
                  placeholder="Associate"
                  name="associate"
                  value={this.state.associate}
                  // onChange={this.onChange}
                />
                {errors.associate && (
                  <div className="invalid-feedback">{errors.associate}</div>
                )}
              </div>
            ) : (
              <div className="col-md-6 mb-2">
                <h5>
                  Associate: <strong>{log.associate}</strong>
                </h5>
              </div>
            )}

            {isEditable ? (
              <div className="form-group col-md-6">
                <label className="mb-1" htmlFor="shipperConsignee">
                  Shipper/Consignee
                </label>
                <input
                  readOnly={!isEditable}
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.shipperConsignee
                  })}
                  placeholder="Shipper/Consignee"
                  name="shipperConsignee"
                  value={this.state.shipperConsignee}
                  onChange={this.onChange}
                  maxLength="100"
                />
                {errors.shipperConsignee && (
                  <div className="invalid-feedback">
                    {errors.shipperConsignee}
                  </div>
                )}
              </div>
            ) : (
              <div className="col-md-6 mb-2">
                <h5>
                  Shipper/Consignee: <strong>{log.shipperConsignee}</strong>
                </h5>
              </div>
            )}
          </div>

          <div className="row">
            {isEditable ? (
              <div className="form-group col-md-6">
                <label className="mb-1" htmlFor="modeOfTransport">
                  Mode of Transport
                </label>
                <input
                  readOnly={!isEditable}
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.modeOfTransport
                  })}
                  placeholder="Mode of Transport"
                  name="modeOfTransport"
                  value={this.state.modeOfTransport}
                  onChange={this.onChange}
                  maxLength="100"
                />
                {errors.modeOfTransport && (
                  <div className="invalid-feedback">
                    {errors.modeOfTransport}
                  </div>
                )}
              </div>
            ) : (
              <div className="col-md-6 mb-2">
                <h5>
                  Mode of Transport: <strong>{log.modeOfTransport}</strong>
                </h5>
              </div>
            )}

            {isEditable ? (
              <div className="form-group col-md-6">
                <label className="mb-1" htmlFor="commodity">
                  Commodity
                </label>
                <input
                  readOnly={!isEditable}
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.commodity
                  })}
                  placeholder="Commodity"
                  name="commodity"
                  value={this.state.commodity}
                  onChange={this.onChange}
                  maxLength="100"
                />
                {errors.commodity && (
                  <div className="invalid-feedback">{errors.commodity}</div>
                )}
              </div>
            ) : (
              <div className="col-md-6 mb-2">
                <h5>
                  Commodity: <strong>{log.commodity}</strong>
                </h5>
              </div>
            )}
          </div>

          <div className="row">
            {isEditable ? (
              <div className="form-group col-md-6">
                <label className="mb-1" htmlFor="blAwb">
                  BL/AWB
                </label>
                <input
                  readOnly={!isEditable}
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.blAwb
                  })}
                  placeholder="BL/AWB"
                  name="blAwb"
                  value={this.state.blAwb}
                  onChange={this.onChange}
                  maxLength="100"
                />
                {errors.blAwb && (
                  <div className="invalid-feedback">{errors.blAwb}</div>
                )}
              </div>
            ) : (
              <div className="col-md-6 mb-2">
                <h5>
                  BL/AWB: <strong>{log.blAwb}</strong>
                </h5>
              </div>
            )}

            {isEditable ? (
              <div className="form-group col-md-6">
                <label className="mb-1" htmlFor="origin">
                  Origin
                </label>
                <input
                  readOnly={!isEditable}
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.origin
                  })}
                  placeholder="Origin"
                  name="origin"
                  value={this.state.origin}
                  onChange={this.onChange}
                  maxLength="100"
                />
                {errors.origin && (
                  <div className="invalid-feedback">{errors.origin}</div>
                )}
              </div>
            ) : (
              <div className="col-md-6 mb-2">
                <h5>
                  Origin: <strong>{log.origin}</strong>
                </h5>
              </div>
            )}
          </div>

          <div className="row">
            {isEditable ? (
              <div className="form-group col-md-6">
                <label className="mb-1" htmlFor="destination">
                  Destination
                </label>
                <input
                  readOnly={!isEditable}
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.destination
                  })}
                  placeholder="Destination"
                  name="destination"
                  value={this.state.destination}
                  onChange={this.onChange}
                  maxLength="100"
                />
                {errors.destination && (
                  <div className="invalid-feedback">{errors.destination}</div>
                )}
              </div>
            ) : (
              <div className="col-md-6 mb-2">
                <h5>
                  Destination: <strong>{log.destination}</strong>
                </h5>
              </div>
            )}

            {isEditable ? (
              <div className="form-group col-md-6">
                <label className="mb-1" htmlFor="etd">
                  ETD
                </label>
                <input
                  readOnly={!isEditable}
                  type="date"
                  className={classnames("form-control", {
                    "is-invalid": errors.etd
                  })}
                  name="etd"
                  value={this.state.etd}
                  onChange={this.onChange}
                />
                {errors.etd && (
                  <div className="invalid-feedback">{errors.etd}</div>
                )}
              </div>
            ) : (
              <div className="col-md-6 mb-2">
                <h5>
                  ETD:{" "}
                  <strong title={moment(log.etd).format("MMMM Do YYYY")}>
                    <Moment format="MM/DD/YYYY">{log.etd}</Moment>
                  </strong>
                </h5>
              </div>
            )}
          </div>

          <div className="row">
            {isEditable ? (
              <div className="form-group col-md-6">
                <label className="mb-1" htmlFor="eta">
                  ETA
                </label>
                <input
                  readOnly={!isEditable}
                  type="date"
                  className={classnames("form-control", {
                    "is-invalid": errors.eta
                  })}
                  name="eta"
                  value={this.state.eta}
                  onChange={this.onChange}
                  min={etaLimit}
                />
                {errors.eta && (
                  <div className="invalid-feedback">{errors.eta}</div>
                )}
              </div>
            ) : (
              <div className="col-md-6 mb-2">
                <h5>
                  ETA:{" "}
                  <strong title={moment(log.eta).format("MMMM Do YYYY")}>
                    <Moment format="MM/DD/YYYY">{log.eta}</Moment>
                  </strong>
                </h5>
              </div>
            )}

            {isEditable ? (
              <div className="form-group col-md-6">
                <label className="mb-1" htmlFor="status">
                  Status
                </label>

                <select
                  className={classnames("form-control", {
                    "is-invalid": errors.status
                  })}
                  disabled={!isEditable}
                  readOnly={!isEditable}
                  id="status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                >
                  <option value="Ongoing">Ongoing</option>
                  <option value="Complete">Complete</option>
                  <option value="Waiting">Waiting</option>
                  <option value="Void">Void</option>
                </select>
                {errors.status && (
                  <div className="invalid-feedback">{errors.status}</div>
                )}
              </div>
            ) : (
              <div className="col-md-6 mb-2">
                <h5>
                  Status: <strong>{log.status}</strong>
                </h5>
              </div>
            )}
          </div>

          <div className="row">
            {isEditable ? (
              <div className="form-group col-md-12">
                <label className="mb-1" htmlFor="status">
                  Customer Satisfaction
                </label>

                <textarea
                  className={classnames("form-control form-control-lg", {})}
                  placeholder="Customer satisfaction"
                  name="rating"
                  value={this.state.rating}
                  onChange={this.onChange}
                  maxLength="300"
                />
              </div>
            ) : (
              <div className="col-md-12 mb-2">
                <h5>
                  Customer satisfaction: <em>{this.state.rating}</em>
                </h5>
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
}

LogViewEdit.propTypes = {
  getDomesticLogs: PropTypes.func.isRequired,
  editLog: PropTypes.func.isRequired,
  getInternationalLogs: PropTypes.func.isRequired,
  deleteLog: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  log: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  log: state.log.log,
  errors: state.errors,
  success: state.success
});

export default connect(
  mapStateToProps,
  { editLog, getDomesticLogs, getInternationalLogs, deleteLog }
)(LogViewEdit);
