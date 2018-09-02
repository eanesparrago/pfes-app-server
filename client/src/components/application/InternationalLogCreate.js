import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import moment from "moment";

import classnames from "classnames";
import { connect } from "react-redux";
import { createInternationalLog, clearErrors } from "../../actions/logsActions";
import { clearSuccess } from "../../actions/successActions";
import { clearAlert } from "../../actions/alertActions";

import AlertBox from "./AlertBox";

import isEmpty from "../../validation/is-empty";

import countries from "../../assets/countries.json";

class InternationalLogCreate extends Component {
  constructor() {
    super();
    this.state = {
      shipperConsignee: "",
      associate: "",
      modeOfTransport: "",

      commodityType: "",
      commodityDescription: "",

      blAwb: "",

      originCountry: "",
      originLocation: "",

      portOfDepartureCountry: "",
      portOfDepartureLocation: "",

      portOfArrivalCountry: "",
      portOfArrivalLocation: "",

      destinationCountry: "",
      destinationLocation: "",

      pickupDate: moment().format("YYYY-MM-DD"),
      etd: moment().format("YYYY-MM-DD"),
      eta: moment().format("YYYY-MM-DD"),
      status: "Ongoing",

      contactName: "",
      contactNumber: "",
      contactEmail: "",

      tagUrgent: false,
      tagInsured: false,

      additional: "",

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

        commodityType: "",
        commodityDescription: "",

        blAwb: "",

        originCountry: "",
        originLocation: "",

        portOfDepartureCountry: "",
        portOfDepartureLocation: "",

        portOfArrivalCountry: "",
        portOfArrivalLocation: "",

        destinationCountry: "",
        destinationLocation: "",

        pickupDate: moment().format("YYYY-MM-DD"),
        etd: moment().format("YYYY-MM-DD"),
        eta: moment().format("YYYY-MM-DD"),
        status: "Ongoing",

        contactName: "",
        contactNumber: "",
        contactEmail: "",

        tagUrgent: false,
        tagInsured: false,

        additional: "",

        errors: {}
      });

      this.props.clearSuccess();
    }
  }

  // @onChange
  onChange(e) {
    // pickupDate, etd, eta
    if (
      e.target.name === "pickupDate" ||
      e.target.name === "etd" ||
      e.target.name === "eta"
    ) {
      if (e.target.value === "") {
        return;
      } else {
        const today = Date.parse(moment());

        switch (e.target.name) {
          case "pickupDate":
            this.setState({ pickupDate: e.target.value }, () => {
              let pickupDate = Date.parse(
                moment(this.state.pickupDate).format("DD MMM YYYY")
              );

              if (pickupDate < today) {
                this.setState({
                  pickupDate: moment(today).format("YYYY-MM-DD")
                });
              }

              let etd = Date.parse(
                moment(this.state.etd).format("DD MMM YYYY")
              );

              if (etd < pickupDate) {
                this.setState(
                  {
                    etd: moment(pickupDate).format("YYYY-MM-DD")
                  },
                  () => {
                    etd = Date.parse(
                      moment(this.state.etd).format("DD MMM YYYY")
                    );

                    let eta = Date.parse(
                      moment(this.state.eta).format("DD MMM YYYY")
                    );

                    if (eta < etd) {
                      this.setState({
                        eta: moment(etd).format("YYYY-MM-DD")
                      });
                    }
                  }
                );
              }
            });
            break;

          case "etd":
            this.setState({ etd: e.target.value }, () => {
              let pickupDate = Date.parse(
                moment(this.state.pickupDate).format("DD MMM YYYY")
              );

              let etd = Date.parse(
                moment(this.state.etd).format("DD MMM YYYY")
              );

              if (etd < pickupDate) {
                this.setState({ etd: moment(pickupDate).format("YYYY-MM-DD") });
              }

              let eta = Date.parse(
                moment(this.state.eta).format("DD MMM YYYY")
              );

              if (eta < etd) {
                this.setState({
                  eta: moment(etd).format("YYYY-MM-DD")
                });
              }
            });
            break;

          case "eta":
            this.setState({ eta: e.target.value }, () => {
              let etd = Date.parse(
                moment(this.state.etd).format("DD MMM YYYY")
              );

              let eta = Date.parse(
                moment(this.state.eta).format("DD MMM YYYY")
              );

              if (eta < etd) {
                this.setState({
                  eta: moment(etd).format("YYYY-MM-DD")
                });
              }
            });
            break;

          default:
            console.log("Oh my...");
        }

        return;
      }
      // contactName
    } else if (e.target.name === "contactName") {
      const regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

      if (e.target.value === "") {
        this.setState({ [e.target.name]: e.target.value });
      } else if (regex.test(e.target.value)) {
        this.setState({ [e.target.name]: e.target.value });
      }
      return;
      // contactNumber
    } else if (e.target.name === "contactNumber") {
      const regex = /[\d-]+$/u;

      if (e.target.value === "") {
        this.setState({ [e.target.name]: e.target.value });
      } else if (regex.test(e.target.value)) {
        this.setState({ [e.target.name]: e.target.value });
      }
      return;
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
    // modeofTransport
    if (e.target.name === "modeOfTransport") {
      this.setState({ blAwb: "" });

      if (e.target.value === "Air") {
        this.setState({ commodityType: "" });
      }

      if (e.target.value === "Truck") {
        this.setState({
          portOfDepartureCountry: "",
          portOfDepartureLocation: "",

          portOfArrivalCountry: "",
          portOfArrivalLocation: ""
        });
      }
    }
  }

  toggleCheck(e) {
    this.setState({ [e.target.name]: !this.state[e.target.name] });
  }

  // @onSubmit
  onSubmit(e) {
    e.preventDefault();

    const logData = {
      shipperConsignee: this.state.shipperConsignee,
      modeOfTransport: this.state.modeOfTransport,

      commodityType: this.state.commodityType,
      commodityDescription: this.state.commodityDescription,

      blAwb: this.state.blAwb,

      originCountry: this.state.originCountry,
      originLocation: this.state.originLocation,

      portOfDepartureCountry: this.state.portOfDepartureCountry,
      portOfDepartureLocation: this.state.portOfDepartureLocation,

      portOfArrivalCountry: this.state.portOfArrivalCountry,
      portOfArrivalLocation: this.state.portOfArrivalLocation,

      destinationCountry: this.state.destinationCountry,
      destinationLocation: this.state.destinationLocation,

      pickupDate: this.state.pickupDate,
      etd: this.state.etd,
      eta: this.state.eta,
      status: this.state.status,

      tagUrgent: this.state.tagUrgent,
      tagInsured: this.state.tagInsured,

      additional: this.state.additional,

      contactName: this.state.contactName,
      contactNumber: this.state.contactNumber,
      contactEmail: this.state.contactEmail,

      type: "International"
    };

    this.props.createInternationalLog(logData);
  }

  onOpen() {
    this.setState({
      shipperConsignee: "",
      associate: "",
      modeOfTransport: "",

      commodityType: "",
      commodityDescription: "",

      blAwb: "",

      originCountry: "",
      originLocation: "",

      portOfDepartureCountry: "",
      portOfDepartureLocation: "",

      portOfArrivalCountry: "",
      portOfArrivalLocation: "",

      destinationCountry: "",
      destinationLocation: "",

      pickupDate: moment().format("YYYY-MM-DD"),
      etd: moment().format("YYYY-MM-DD"),
      eta: moment().format("YYYY-MM-DD"),
      status: "Ongoing",

      contactName: "",
      contactNumber: "",
      contactEmail: "",

      tagUrgent: false,
      tagInsured: false,

      additional: "",

      errors: {}
    });

    this.props.clearErrors();
  }

  onClose() {
    this.setState({
      shipperConsignee: "",
      associate: "",
      modeOfTransport: "",

      commodityType: "",
      commodityDescription: "",

      blAwb: "",

      originCountry: "",
      originLocation: "",

      portOfDepartureCountry: "",
      portOfDepartureLocation: "",

      portOfArrivalCountry: "",
      portOfArrivalLocation: "",

      destinationCountry: "",
      destinationLocation: "",

      pickupDate: moment().format("YYYY-MM-DD"),
      etd: moment().format("YYYY-MM-DD"),
      eta: moment().format("YYYY-MM-DD"),
      status: "Ongoing",

      contactName: "",
      contactNumber: "",
      contactEmail: "",

      tagUrgent: false,
      tagInsured: false,

      additional: "",

      errors: {}
    });

    this.props.clearErrors();
    this.props.clearAlert();
  }

  render() {
    const { errors } = this.state;
    const { auth, log } = this.props;

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
          className="btn btn-primary mr-3 shadow-sm"
          data-toggle="modal"
          data-target="#internationalLogCreate"
          onClick={this.onOpen}
        >
          <i className="far fa-edit" /> New Job Order
        </button>
        <div
          className="modal fade-in-2"
          id="internationalLogCreate"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-backdrop="static"
          data-keyboard="false"
        >
          <div className="modal-dialog modal-lg" role="dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  New International Job Order
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
                <AlertBox />

                {/* FORM */}
                <form noValidate>
                  <h5 className="text-primary">Contact Details</h5>

                  <div className="row">
                    <div className="form-group col-lg-4">
                      <label className="mb-1" htmlFor="contactName">
                        <strong>Contact Name</strong>
                      </label>
                      <input
                        type="text"
                        className={classnames("form-control", {
                          "is-invalid": errors.contactName
                        })}
                        placeholder=""
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

                    <div className="form-group col-lg-4">
                      <label className="mb-1" htmlFor="contactNumber">
                        <strong>Contact Number</strong>
                      </label>

                      <input
                        type="text"
                        className={classnames("form-control", {
                          "is-invalid": errors.contactNumber
                        })}
                        placeholder=""
                        name="contactNumber"
                        value={this.state.contactNumber}
                        onChange={this.onChange}
                        maxLength="15"
                      />
                      {errors.contactNumber && (
                        <div className="invalid-feedback">
                          {errors.contactNumber}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-lg-4">
                      <label className="mb-1" htmlFor="contactEmail">
                        <strong>Contact Email</strong>
                      </label>
                      <input
                        type="text"
                        className={classnames("form-control", {
                          "is-invalid": errors.contactEmail
                        })}
                        placeholder="example@address.com"
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

                  <div className="dropdown-divider" />

                  <h5 className="text-primary mt-3">Job Order Details</h5>

                  <div className="row">
                    <div className="col-md-12 my-2">
                      <h5>
                        Associate:{" "}
                        <strong>
                          {auth.user.firstName} {auth.user.lastName}
                        </strong>
                      </h5>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-6">
                      <label className="mb-1" htmlFor="shipperConsignee">
                        <strong>Shipper/Consignee</strong>
                      </label>
                      <input
                        type="text"
                        className={classnames("form-control", {
                          "is-invalid": errors.shipperConsignee
                        })}
                        placeholder=""
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
                      <label className="mb-1" htmlFor="modeOfTransport">
                        <strong>Mode of Transport</strong>
                      </label>

                      <select
                        className={classnames("form-control", {
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
                        <option value="Sea">Sea</option>
                        <option value="Air">Air</option>
                      </select>

                      {errors.modeOfTransport && (
                        <div className="invalid-feedback">
                          {errors.modeOfTransport}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6">
                      <div className="row">
                        <div className="form-group col-5 pr-1">
                          <label className="mb-1" htmlFor="commodity">
                            <strong>Commodity</strong>
                          </label>

                          <select
                            disabled={
                              this.state.modeOfTransport === "" ||
                              this.state.modeOfTransport === "Air"
                                ? true
                                : false
                            }
                            className={classnames("form-control", {
                              "is-invalid": errors.commodityType
                            })}
                            id="commodityType"
                            name="commodityType"
                            value={this.state.commodityType}
                            onChange={this.onChange}
                          >
                            <option value="" disabled defaultValue>
                              (Container)
                            </option>

                            <option value="FCL 1x10'">FCL 1x10'</option>

                            <option value="FCL 1x20'">FCL 1x20'</option>

                            <option value="FCL 1x40'">FCL 1x40'</option>

                            <option value="FCL 1x40' HC">FCL 1x40' HC</option>

                            <option value="LCL">LCL</option>
                          </select>

                          <small className="form-text text-muted">
                            For Sea Only
                          </small>

                          {errors.commodityType && (
                            <div className="invalid-feedback">
                              {errors.commodityType}
                            </div>
                          )}
                        </div>

                        <div className="form-group col-7 pl-1">
                          <label className="mb-1" htmlFor="commodity">
                            &nbsp;
                          </label>

                          <input
                            type="text"
                            className={classnames("form-control", {
                              "is-invalid": errors.commodityDescription
                            })}
                            placeholder="Description"
                            name="commodityDescription"
                            value={this.state.commodityDescription}
                            onChange={this.onChange}
                            maxLength="100"
                          />
                          {errors.commodityDescription && (
                            <div className="invalid-feedback">
                              {errors.commodityDescription}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="form-group col-md-6">
                      {this.state.modeOfTransport === "" ||
                      this.state.modeOfTransport === "Truck" ? (
                        <label className="mb-1" htmlFor="blAwb">
                          <span className="text-muted">
                            <em>BL/AWB#</em>
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
                            <em>BL/AWB#</em>
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
                        className={classnames("form-control", {
                          "is-invalid": errors.blAwb
                        })}
                        placeholder={
                          this.state.modeOfTransport === "" ||
                          this.state.modeOfTransport === "Truck"
                            ? ""
                            : this.state.modeOfTransport === "Sea"
                              ? ""
                              : this.state.modeOfTransport === "Air"
                                ? ""
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

                  <div className="dropdown-divider" />

                  {/* @origin */}
                  <div className="row mt-3">
                    <div className="form-group col-lg-8 pr-lg-1">
                      <label className="mb-1" htmlFor="originLocation">
                        <strong>Origin Address</strong>
                      </label>

                      <input
                        type="text"
                        className={classnames("form-control", {
                          "is-invalid": errors.originLocation
                        })}
                        placeholder=""
                        name="originLocation"
                        value={this.state.originLocation}
                        onChange={this.onChange}
                        maxLength="100"
                      />

                      <small className="form-text text-muted">Address</small>

                      {errors.originLocation && (
                        <div className="invalid-feedback">
                          {errors.originLocation}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-lg-4 pl-lg-1">
                      <label
                        className="mb-1 d-none d-lg-block"
                        htmlFor="originCity"
                      >
                        &nbsp;
                      </label>

                      <select
                        className={classnames("form-control", {
                          "is-invalid": errors.originCountry
                        })}
                        id="originCountry"
                        name="originCountry"
                        value={this.state.originCountry}
                        onChange={this.onChange}
                      >
                        <option value="" disabled defaultValue>
                          Select a Country
                        </option>

                        {countries.map((country, index) => {
                          return (
                            <option key={index} value={country.name}>
                              {country.name}
                            </option>
                          );
                        })}
                      </select>

                      <small className="form-text text-muted">Country</small>

                      {errors.originCountry && (
                        <div className="invalid-feedback">
                          {errors.originCountry}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* @portOfDeparture */}
                  <div className="row">
                    <div className="form-group col-lg-8 pr-lg-1">
                      <label className="mb-1" htmlFor="portOfDepartureLocation">
                        <strong>Port of Departure</strong>
                      </label>

                      <input
                        type="text"
                        className={classnames("form-control", {
                          "is-invalid": errors.portOfDepartureLocation
                        })}
                        placeholder=""
                        name="portOfDepartureLocation"
                        value={this.state.portOfDepartureLocation}
                        onChange={this.onChange}
                        maxLength="100"
                      />

                      <small className="form-text text-muted">Port Name</small>

                      {errors.portOfDepartureLocation && (
                        <div className="invalid-feedback">
                          {errors.portOfDepartureLocation}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-lg-4 pl-lg-1">
                      <label
                        className="mb-1 d-none d-lg-block"
                        htmlFor="portOfDepartureCountry"
                      >
                        &nbsp;
                      </label>

                      <select
                        className={classnames("form-control", {
                          "is-invalid": errors.portOfDepartureCountry
                        })}
                        id="portOfDepartureCountry"
                        name="portOfDepartureCountry"
                        value={this.state.portOfDepartureCountry}
                        onChange={this.onChange}
                      >
                        <option value="" disabled defaultValue>
                          Select a Country
                        </option>

                        {countries.map((country, index) => {
                          return (
                            <option key={index} value={country.name}>
                              {country.name}
                            </option>
                          );
                        })}
                      </select>

                      <small className="form-text text-muted">Country</small>

                      {errors.portOfDepartureCountry && (
                        <div className="invalid-feedback">
                          {errors.portOfDepartureCountry}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* @portOfArrival */}
                  <div className="row">
                    <div className="form-group col-lg-8 pr-lg-1">
                      <label className="mb-1" htmlFor="portOfArrivalLocation">
                        <strong>Port of Arrival</strong>
                      </label>

                      <input
                        type="text"
                        className={classnames("form-control", {
                          "is-invalid": errors.portOfArrivalLocation
                        })}
                        placeholder=""
                        name="portOfArrivalLocation"
                        value={this.state.portOfArrivalLocation}
                        onChange={this.onChange}
                        maxLength="100"
                      />

                      <small className="form-text text-muted">Port Name</small>

                      {errors.portOfArrivalLocation && (
                        <div className="invalid-feedback">
                          {errors.portOfArrivalLocation}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-lg-4 pl-lg-1">
                      <label
                        className="mb-1 d-none d-lg-block"
                        htmlFor="portOfArrivalCountry"
                      >
                        &nbsp;
                      </label>

                      <select
                        className={classnames("form-control", {
                          "is-invalid": errors.portOfArrivalCountry
                        })}
                        id="portOfArrivalCountry"
                        name="portOfArrivalCountry"
                        value={this.state.portOfArrivalCountry}
                        onChange={this.onChange}
                      >
                        <option value="" disabled defaultValue>
                          Select a Country
                        </option>

                        {countries.map((country, index) => {
                          return (
                            <option key={index} value={country.name}>
                              {country.name}
                            </option>
                          );
                        })}
                      </select>

                      <small className="form-text text-muted">Country</small>

                      {errors.portOfArrivalCountry && (
                        <div className="invalid-feedback">
                          {errors.portOfArrivalCountry}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* @destination */}
                  <div className="row">
                    <div className="form-group col-lg-8 pr-lg-1">
                      <label className="mb-1" htmlFor="destinationLocation">
                        <strong>Destination Address</strong>
                      </label>

                      <input
                        type="text"
                        className={classnames("form-control", {
                          "is-invalid": errors.destinationLocation
                        })}
                        placeholder=""
                        name="destinationLocation"
                        value={this.state.destinationLocation}
                        onChange={this.onChange}
                        maxLength="100"
                      />

                      <small className="form-text text-muted">Address</small>

                      {errors.destinationLocation && (
                        <div className="invalid-feedback">
                          {errors.destinationLocation}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-lg-4 pl-lg-1">
                      <label
                        className="mb-1 d-none d-lg-block"
                        htmlFor="destinationCity"
                      >
                        &nbsp;
                      </label>

                      <select
                        className={classnames("form-control", {
                          "is-invalid": errors.destinationCountry
                        })}
                        id="destinationCountry"
                        name="destinationCountry"
                        value={this.state.destinationCountry}
                        onChange={this.onChange}
                      >
                        <option value="" disabled defaultValue>
                          Select a Country
                        </option>

                        {countries.map((country, index) => {
                          return (
                            <option key={index} value={country.name}>
                              {country.name}
                            </option>
                          );
                        })}
                      </select>

                      <small className="form-text text-muted">Country</small>

                      {errors.destinationCountry && (
                        <div className="invalid-feedback">
                          {errors.destinationCountry}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="dropdown-divider" />

                  <div className="row mt-3">
                    {/* @pickup */}
                    <div className="form-group col-lg-4">
                      <label className="mb-1" htmlFor="pickupDate">
                        <strong>Pickup Date</strong>
                      </label>
                      <input
                        type="date"
                        className={classnames("form-control", {
                          "is-invalid": errors.pickupDate
                        })}
                        name="pickupDate"
                        value={this.state.pickupDate}
                        onChange={this.onChange}
                        min={moment().format("YYYY-MM-DD")}
                        max="2999-01-01"
                      />
                      {errors.pickupDate && (
                        <div className="invalid-feedback">
                          {errors.pickupDate}
                        </div>
                      )}
                    </div>

                    {/* @etd */}
                    <div className="form-group col-lg-4">
                      <label className="mb-1" htmlFor="etd">
                        <strong>ETD</strong>
                      </label>
                      <input
                        type="date"
                        className={classnames("form-control", {
                          "is-invalid": errors.etd
                        })}
                        name="etd"
                        value={this.state.etd}
                        onChange={this.onChange}
                        min={moment(this.state.pickupDate).format("YYYY-MM-DD")}
                        max="2999-01-01"
                      />
                      {errors.etd && (
                        <div className="invalid-feedback">{errors.etd}</div>
                      )}
                    </div>

                    <div className="form-group col-lg-4">
                      <label className="mb-1" htmlFor="eta">
                        <strong>ETA</strong>
                      </label>
                      <input
                        type="date"
                        className={classnames("form-control", {
                          "is-invalid": errors.eta
                        })}
                        name="eta"
                        value={this.state.eta}
                        onChange={this.onChange}
                        min={etaLimit}
                        max="2999-01-01"
                      />
                      {errors.eta && (
                        <div className="invalid-feedback">{errors.eta}</div>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-6">
                      <label className="mb-1" htmlFor="status">
                        <strong>Status</strong>
                      </label>

                      <select
                        className={classnames("form-control", {
                          "is-invalid": errors.status
                        })}
                        id="status"
                        name="status"
                        value={this.state.status}
                        onChange={this.onChange}
                      >
                        <option value="Ongoing">Ongoing</option>
                        <option value="Waiting">Waiting</option>
                        <option value="Void">Void</option>
                      </select>

                      {errors.status && (
                        <div className="invalid-feedback">{errors.status}</div>
                      )}
                    </div>

                    <div className="form-group col-md-6">
                      <label className="mb-1" htmlFor="status">
                        <strong>Tags</strong>
                      </label>

                      <div className="form-control">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="tagUrgentInternational"
                            name="tagUrgent"
                            checked={this.state.tagUrgent}
                            onChange={this.toggleCheck}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="tagUrgentInternational"
                          >
                            Urgent
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="tagInsuredInternational"
                            name="tagInsured"
                            checked={this.state.tagInsured}
                            onChange={this.toggleCheck}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="tagInsuredInternational"
                          >
                            Insured
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-12">
                      <label
                        className="mb-1"
                        htmlFor="internationalcreateAdditional"
                      >
                        <strong>Remarks</strong>
                      </label>

                      <textarea
                        className="form-control"
                        name="additional"
                        id="internationalreateAdditional"
                        onChange={this.onChange}
                        value={this.state.additional}
                      />
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
                      disabled={log.submitInProgress ? true : false}
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

InternationalLogCreate.propTypes = {
  createInternationalLog: PropTypes.func.isRequired,
  clearSuccess: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  clearAlert: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  log: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  success: state.success,
  auth: state.auth,
  log: state.log
});

export default connect(
  mapStateToProps,
  {
    createInternationalLog,
    clearSuccess,
    clearErrors,
    clearAlert
  }
)(withRouter(InternationalLogCreate));
