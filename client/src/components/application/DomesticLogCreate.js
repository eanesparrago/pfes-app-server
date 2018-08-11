import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import moment from "moment";

import classnames from "classnames";
import { connect } from "react-redux";
import { createDomesticLog, clearErrors } from "../../actions/logsActions";
import { clearSuccess } from "../../actions/successActions";

import isEmpty from "../../validation/is-empty";

class DomesticLogCreate extends Component {
  constructor() {
    super();
    this.state = {
      shipperConsignee: "",
      associate: "",
      modeOfTransport: "",
      commodity: "",
      blAwb: "",
      origin: "",
      destination: "",
      etd: moment().format("YYYY-MM-DD"),
      eta: moment().format("YYYY-MM-DD"),
      status: "Ongoing",

      contactName: "",
      contactNumber: "",
      contactEmail: "",

      tagUrgent: false,
      tagImportant: false,
      tagInsured: false,

      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.toggleCheck = this.toggleCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (!isEmpty(nextProps.success)) {
      this.setState({
        shipperConsignee: "",
        associate: "",
        modeOfTransport: "",
        commodity: "",
        blAwb: "",
        origin: "",
        destination: "",
        etd: moment().format("YYYY-MM-DD"),
        eta: moment().format("YYYY-MM-DD"),
        status: "Ongoing",

        contactName: "",
        contactNumber: "",
        contactEmail: "",

        tagUrgent: false,
        tagImportant: false,
        tagInsured: false,

        errors: {}
      });

      this.props.clearSuccess();
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
      return;
    } else if (e.target.name === "contactName") {
      const regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

      if (e.target.value === "") {
        this.setState({ [e.target.name]: e.target.value });
      } else if (regex.test(e.target.value)) {
        this.setState({ [e.target.name]: e.target.value });
      }
      return;
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }

    if (e.target.name === "modeOfTransport") {
      this.setState({ blAwb: "" });
    }
  }

  toggleCheck(e) {
    this.setState({ [e.target.name]: !this.state[e.target.name] }, () => {
      console.log(this.state);
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      shipperConsignee: this.state.shipperConsignee,
      modeOfTransport: this.state.modeOfTransport,
      commodity: this.state.commodity,
      blAwb: this.state.blAwb,
      origin: this.state.origin,
      destination: this.state.destination,
      etd: this.state.etd,
      eta: this.state.eta,
      status: this.state.status,

      tagUrgent: this.state.tagUrgent,
      tagImportant: this.state.tagImportant,
      tagInsured: this.state.tagInsured,

      contactName: this.state.contactName,
      contactNumber: this.state.contactNumber,
      contactEmail: this.state.contactEmail
    };

    this.props.createDomesticLog(newUser);
  }

  onOpen() {
    this.setState({
      shipperConsignee: "",
      associate: "",
      modeOfTransport: "",
      commodity: "",
      blAwb: "",
      origin: "",
      destination: "",
      etd: moment().format("YYYY-MM-DD"),
      eta: moment().format("YYYY-MM-DD"),
      status: "Ongoing",

      contactName: "",
      contactNumber: "",
      contactEmail: "",

      tagUrgent: false,
      tagImportant: false,
      tagInsured: false,

      errors: {}
    });

    this.props.clearErrors();
  }

  onClose() {
    this.setState({
      shipperConsignee: "",
      associate: "",
      modeOfTransport: "",
      commodity: "",
      blAwb: "",
      origin: "",
      destination: "",
      etd: moment().format("YYYY-MM-DD"),
      eta: moment().format("YYYY-MM-DD"),
      status: "Ongoing",

      contactName: "",
      contactNumber: "",
      contactEmail: "",

      tagUrgent: false,
      tagImportant: false,
      tagInsured: false,

      errors: {}
    });

    this.props.clearErrors();
  }

  render() {
    const { errors } = this.state;
    const { auth } = this.props;

    let etaLimit;
    if (this.state.etd !== "") {
      etaLimit = moment(this.state.etd).format("YYYY-MM-DD");
    } else {
      etaLimit = moment().format("YYYY-MM-DD");
    }

    return (
      <div className="">
        <button
          type="button"
          className="btn btn-primary mr-3"
          data-toggle="modal"
          data-target="#domesticLogCreate"
          onClick={this.onOpen}
        >
          New Job Order
        </button>
        <div
          className="modal fade"
          id="domesticLogCreate"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  New Domestic Job Order
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.onClose}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* FORM */}
                <form noValidate>
                  <div className="row">
                    <div className="form-group col-md-12">
                      <label className="mb-1" htmlFor="associate">
                        Associate
                      </label>
                      <input
                        readOnly
                        type="text"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.associate
                        })}
                        placeholder="Associate"
                        name="associate"
                        value={`${auth.user.firstName} ${auth.user.lastName}`}
                        // onChange={this.onChange}
                      />
                      {errors.associate && (
                        <div className="invalid-feedback">
                          {errors.associate}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-6">
                      <label className="mb-1" htmlFor="shipperConsignee">
                        Shipper/Consignee
                      </label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg", {
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

                    <div className="form-group col-md-6">
                      <label className="mb-1" htmlFor="commodity">
                        Commodity
                      </label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.commodity
                        })}
                        placeholder="Commodity"
                        name="commodity"
                        value={this.state.commodity}
                        onChange={this.onChange}
                        maxLength="100"
                      />
                      {errors.commodity && (
                        <div className="invalid-feedback">
                          {errors.commodity}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-6">
                      <label className="mb-1" htmlFor="modeOfTransport">
                        Mode of Transport
                      </label>

                      <select
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.modeOfTransport
                        })}
                        id="modeOfTransport"
                        name="modeOfTransport"
                        value={this.state.modeOfTransport}
                        onChange={this.onChange}
                      >
                        <option value="" disabled defaultValue>
                          Select a Mode of Transport
                        </option>
                        <option value="Truck">Truck</option>
                        <option value="Sea">Sea</option>
                        <option value="Air">Air</option>
                      </select>

                      {errors.modeOfTransport && (
                        <div className="invalid-feedback">
                          {errors.modeOfTransport}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-6">
                      {this.state.modeOfTransport === "" ||
                      this.state.modeOfTransport === "Truck" ? (
                        <label className="mb-1" htmlFor="blAwb">
                          <span className="text-muted">
                            <em>For Air and Sea transport only</em>
                          </span>
                        </label>
                      ) : this.state.modeOfTransport === "Sea" ? (
                        <label className="mb-1" htmlFor="blAwb">
                          Bill of Lading Number{" "}
                          <span className="text-muted">
                            <em>- Optional</em>
                          </span>
                        </label>
                      ) : this.state.modeOfTransport === "Air" ? (
                        <label className="mb-1" htmlFor="blAwb">
                          Air Waybill Number{" "}
                          <span className="text-muted">
                            <em>- Optional</em>
                          </span>
                        </label>
                      ) : (
                        <label className="mb-1" htmlFor="blAwb">
                          <span className="text-muted">
                            <em>For Air and Sea transport only</em>
                          </span>
                        </label>
                      )}

                      <input
                        readOnly={
                          this.state.modeOfTransport === "" ||
                          this.state.modeOfTransport === "Truck"
                            ? true
                            : false
                        }
                        type="text"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.blAwb
                        })}
                        placeholder={
                          this.state.modeOfTransport === "" ||
                          this.state.modeOfTransport === "Truck"
                            ? ""
                            : this.state.modeOfTransport === "Sea"
                              ? "Bill of Lading Number"
                              : this.state.modeOfTransport === "Air"
                                ? "Air Waybill Number"
                                : ""
                        }
                        name="blAwb"
                        value={this.state.blAwb}
                        onChange={this.onChange}
                        maxLength="100"
                      />
                      {errors.blAwb && (
                        <div className="invalid-feedback">{errors.blAwb}</div>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-6">
                      <label className="mb-1" htmlFor="origin">
                        Origin
                      </label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg", {
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
                    <div className="form-group col-md-6">
                      <label className="mb-1" htmlFor="destination">
                        Destination
                      </label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.destination
                        })}
                        placeholder="Destination"
                        name="destination"
                        value={this.state.destination}
                        onChange={this.onChange}
                        maxLength="100"
                      />
                      {errors.destination && (
                        <div className="invalid-feedback">
                          {errors.destination}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-6">
                      <label className="mb-1" htmlFor="etd">
                        ETD
                      </label>
                      <input
                        type="date"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.etd
                        })}
                        name="etd"
                        value={this.state.etd}
                        onChange={this.onChange}
                        min={moment().format("YYYY-MM-DD")}
                      />
                      {errors.etd && (
                        <div className="invalid-feedback">{errors.etd}</div>
                      )}
                    </div>
                    <div className="form-group col-md-6">
                      <label className="mb-1" htmlFor="eta">
                        ETA
                      </label>
                      <input
                        type="date"
                        className={classnames("form-control form-control-lg", {
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
                  </div>

                  <div className="row">
                    <div className="form-group col-md-6">
                      <label className="mb-1" htmlFor="status">
                        Status
                      </label>

                      <select
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.status
                        })}
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

                    <div className="form-group col-md-6">
                      <label className="mb-1" htmlFor="status">
                        Tags
                      </label>

                      <div className="form-control form-control-lg">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="tagUrgent"
                            name="tagUrgent"
                            checked={this.state.tagUrgent}
                            onChange={this.toggleCheck}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="tagUrgent"
                          >
                            Urgent
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="tagImportant"
                            name="tagImportant"
                            checked={this.state.tagImportant}
                            onChange={this.toggleCheck}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="tagImportant"
                          >
                            Important
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="tagInsured"
                            name="tagInsured"
                            checked={this.state.tagInsured}
                            onChange={this.toggleCheck}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="tagInsured"
                          >
                            Insured
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="dropdown-divider" />

                  {/* CONTACT */}

                  <h5 className="mt-3">
                    Contact Details
                    <span className="text-muted ">
                      <em> - Optional</em>
                    </span>
                  </h5>

                  <div className="row mt-3">
                    <div className="form-group col-md-4">
                      <label className="mb-1" htmlFor="contactName">
                        Contact Name
                      </label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.contactName
                        })}
                        placeholder="Contact Name"
                        name="contactName"
                        value={this.state.contactName}
                        onChange={this.onChange}
                        maxLength="100"
                      />
                      {errors.contactName && (
                        <div className="invalid-feedback">
                          {errors.contactName}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-4">
                      <label className="mb-1" htmlFor="contactNumber">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.contactNumber
                        })}
                        placeholder="Contact Number"
                        name="contactNumber"
                        value={this.state.contactNumber}
                        onChange={this.onChange}
                        maxLength="100"
                      />
                      {errors.contactNumber && (
                        <div className="invalid-feedback">
                          {errors.contactNumber}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-4">
                      <label className="mb-1" htmlFor="contactEmail">
                        Contact Email{" "}
                      </label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.contactEmail
                        })}
                        placeholder="Contact Email"
                        name="contactEmail"
                        value={this.state.contactEmail}
                        onChange={this.onChange}
                        maxLength="100"
                      />
                      {errors.contactEmail && (
                        <div className="invalid-feedback">
                          {errors.contactEmail}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="modal-footer pb-0 pr-0">
                    <button
                      type="submit"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={this.onClose}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.onSubmit}
                    >
                      Create Job Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DomesticLogCreate.propTypes = {
  createDomesticLog: PropTypes.func.isRequired,
  clearSuccess: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  success: state.success,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    createDomesticLog,
    clearSuccess,
    clearErrors
  }
)(withRouter(DomesticLogCreate));
