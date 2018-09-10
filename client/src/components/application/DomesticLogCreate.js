import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import moment from "moment";

import classnames from "classnames";
import { connect } from "react-redux";
import { createDomesticLog, clearErrors } from "../../actions/logsActions";
import { clearSuccess } from "../../actions/successActions";
import { clearAlert } from "../../actions/alertActions";
import { logoutUser } from "../../actions/authActions";

import AlertBox from "./AlertBox";

import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

import isEmpty from "../../validation/is-empty";

const provinces = require("philippines/provinces");
const cities = require("philippines/cities");

class DomesticLogCreate extends Component {
  constructor() {
    super();
    this.state = {
      shipperConsignee: "",
      associate: "",
      modeOfTransport: "",

      commodityType: "",
      commodityDescription: "",

      blAwb: "",

      originProvinceName: "",
      originProvinceKey: "",
      originCity: "",
      originLocation: "",

      portOfDepartureProvinceName: "",
      portOfDepartureProvinceKey: "",
      portOfDepartureCity: "",
      portOfDepartureLocation: "",

      portOfArrivalProvinceName: "",
      portOfArrivalProvinceKey: "",
      portOfArrivalCity: "",
      portOfArrivalLocation: "",

      destinationProvinceName: "",
      destinationProvinceKey: "",
      destinationCity: "",
      destinationLocation: "",

      pickupDate: moment().format("YYYY-MM-DD"),
      etd: moment().format("YYYY-MM-DD"),
      eta: moment().format("YYYY-MM-DD"),
      status: "Ongoing",

      pickupTime: "",
      deliveryTime: "",

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
      this.typeahead.getInstance().clear();

      this.setState({
        shipperConsignee: "",
        associate: "",
        modeOfTransport: "",

        commodityType: "",
        commodityDescription: "",

        blAwb: "",

        originProvinceName: "",
        originProvinceKey: "",
        originCity: "",
        originLocation: "",

        portOfDepartureProvinceName: "",
        portOfDepartureProvinceKey: "",
        portOfDepartureCity: "",
        portOfDepartureLocation: "",

        portOfArrivalProvinceName: "",
        portOfArrivalProvinceKey: "",
        portOfArrivalCity: "",
        portOfArrivalLocation: "",

        destinationProvinceName: "",
        destinationProvinceKey: "",
        destinationCity: "",
        destinationLocation: "",

        pickupDate: moment().format("YYYY-MM-DD"),
        etd: moment().format("YYYY-MM-DD"),
        eta: moment().format("YYYY-MM-DD"),
        status: "Ongoing",

        pickupTime: "",
        deliveryTime: "",

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
            this.setState(
              {
                pickupDate: e.target.value,
                etd:
                  this.state.modeOfTransport === "Truck"
                    ? e.target.value
                    : this.state.etd
              },
              () => {
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

                let eta = Date.parse(
                  moment(this.state.eta).format("DD MMM YYYY")
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

                      eta = Date.parse(
                        moment(this.state.eta).format("DD MMM YYYY")
                      );

                      if (eta < etd || eta < pickupDate) {
                        this.setState({
                          eta: moment(etd).format("YYYY-MM-DD")
                        });
                      }
                    }
                  );
                }

                if (eta < etd || eta < pickupDate) {
                  this.setState({
                    eta: moment(etd).format("YYYY-MM-DD")
                  });
                }
              }
            );
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
    } else if (e.target.name === "contactName") {
      const regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

      if (e.target.value === "") {
        this.setState({ [e.target.name]: e.target.value });
      } else if (regex.test(e.target.value)) {
        this.setState({ [e.target.name]: e.target.value });
      }
      return;
    } else if (e.target.name === "contactNumber") {
      const regex = /[\d-]+$/u;

      if (e.target.value === "") {
        this.setState({ [e.target.name]: e.target.value });
      } else if (regex.test(e.target.value)) {
        this.setState({ [e.target.name]: e.target.value });
      }
      return;
    } else if (e.target.name === "originProvinceKey") {
      const province = provinces.filter(
        province => province.key === e.target.value
      );

      this.setState({
        originProvinceKey: e.target.value,
        originProvinceName: province[0].name,
        originCity: ""
      });
    } else if (e.target.name === "originCity") {
      this.setState({
        originCity: e.target.value
      });
    } else if (e.target.name === "portOfDepartureProvinceKey") {
      const province = provinces.filter(
        province => province.key === e.target.value
      );

      this.setState({
        portOfDepartureProvinceKey: e.target.value,
        portOfDepartureProvinceName: province[0].name,
        portOfDepartureCity: ""
      });
    } else if (e.target.name === "portOfDepartureCity") {
      this.setState({
        portOfDepartureCity: e.target.value
      });
    } else if (e.target.name === "portOfArrivalProvinceKey") {
      const province = provinces.filter(
        province => province.key === e.target.value
      );

      this.setState({
        portOfArrivalProvinceKey: e.target.value,
        portOfArrivalProvinceName: province[0].name,
        portOfArrivalCity: ""
      });
    } else if (e.target.name === "portOfArrivalCity") {
      this.setState({
        portOfArrivalCity: e.target.value
      });
    } else if (e.target.name === "destinationProvinceKey") {
      const province = provinces.filter(
        province => province.key === e.target.value
      );

      this.setState({
        destinationProvinceKey: e.target.value,
        destinationProvinceName: province[0].name,
        destinationCity: ""
      });
    } else if (e.target.name === "destinationCity") {
      this.setState({
        destinationCity: e.target.value
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }

    if (e.target.name === "modeOfTransport") {
      this.setState({ blAwb: "" });

      if (e.target.value === "Air") {
        this.setState({ commodityType: "" });
      }

      if (e.target.value === "Truck") {
        this.setState({
          portOfDepartureProvinceName: "",
          portOfDepartureProvinceKey: "",
          portOfDepartureCity: "",
          portOfDepartureLocation: "",

          portOfArrivalProvinceName: "",
          portOfArrivalProvinceKey: "",
          portOfArrivalCity: "",
          portOfArrivalLocation: "",

          etd: this.state.pickupDate
        });
      }
    }
  }

  toggleCheck(e) {
    this.setState({ [e.target.name]: !this.state[e.target.name] });
  }

  // @onSubmit
  onSubmit(e) {
    console.log(this.state);
    e.preventDefault();

    const logData = {
      shipperConsignee: this.state.shipperConsignee,
      modeOfTransport: this.state.modeOfTransport,

      commodityType: this.state.commodityType,
      commodityDescription: this.state.commodityDescription,

      blAwb: this.state.blAwb,

      originProvinceName: this.state.originProvinceName,
      originProvinceKey: this.state.originProvinceKey,
      originCity: this.state.originCity,
      originLocation: this.state.originLocation,

      portOfDepartureProvinceName: this.state.portOfDepartureProvinceName,
      portOfDepartureProvinceKey: this.state.portOfDepartureProvinceKey,
      portOfDepartureCity: this.state.portOfDepartureCity,
      portOfDepartureLocation: this.state.portOfDepartureLocation,

      portOfArrivalProvinceName: this.state.portOfArrivalProvinceName,
      portOfArrivalProvinceKey: this.state.portOfArrivalProvinceKey,
      portOfArrivalCity: this.state.portOfArrivalCity,
      portOfArrivalLocation: this.state.portOfArrivalLocation,

      destinationProvinceName: this.state.destinationProvinceName,
      destinationProvinceKey: this.state.destinationProvinceKey,
      destinationCity: this.state.destinationCity,
      destinationLocation: this.state.destinationLocation,

      pickupDate: this.state.pickupDate,
      etd: this.state.etd,
      eta: this.state.eta,
      status: this.state.status,

      pickupTime: this.state.pickupTime,
      deliveryTime: this.state.deliveryTime,

      tagUrgent: this.state.tagUrgent,
      tagInsured: this.state.tagInsured,

      additional: this.state.additional,

      contactName: this.state.contactName,
      contactNumber: this.state.contactNumber,
      contactEmail: this.state.contactEmail,

      type: "Domestic"
    };

    this.props.createDomesticLog(logData);
  }

  onOpen() {
    this.typeahead.getInstance().clear();

    this.setState({
      shipperConsignee: "",
      associate: "",
      modeOfTransport: "",

      commodityType: "",
      commodityDescription: "",

      blAwb: "",

      originProvinceName: "",
      originProvinceKey: "",
      originCity: "",
      originLocation: "",

      portOfDepartureProvinceName: "",
      portOfDepartureProvinceKey: "",
      portOfDepartureCity: "",
      portOfDepartureLocation: "",

      portOfArrivalProvinceName: "",
      portOfArrivalProvinceKey: "",
      portOfArrivalCity: "",
      portOfArrivalLocation: "",

      destinationProvinceName: "",
      destinationProvinceKey: "",
      destinationCity: "",
      destinationLocation: "",

      pickupDate: moment().format("YYYY-MM-DD"),
      etd: moment().format("YYYY-MM-DD"),
      eta: moment().format("YYYY-MM-DD"),
      status: "Ongoing",

      pickupTime: "",
      deliveryTime: "",

      contactName: "",
      contactNumber: "",
      contactEmail: "",

      tagUrgent: false,
      tagInsured: false,

      additional: "",

      errors: {}
    });

    // Logout if token has expired
    const currentTime = Date.now() / 1000;
    if (this.props.auth.user.exp < currentTime) {
      this.props.logoutUser();
    }

    this.props.clearErrors();
  }

  onClose() {
    this.typeahead.getInstance().clear();

    this.setState({
      shipperConsignee: "",
      associate: "",
      modeOfTransport: "",

      commodityType: "",
      commodityDescription: "",

      blAwb: "",

      originProvinceName: "",
      originProvinceKey: "",
      originCity: "",
      originLocation: "",

      portOfDepartureProvinceName: "",
      portOfDepartureProvinceKey: "",
      portOfDepartureCity: "",
      portOfDepartureLocation: "",

      portOfArrivalProvinceName: "",
      portOfArrivalProvinceKey: "",
      portOfArrivalCity: "",
      portOfArrivalLocation: "",

      destinationLocation: "",
      destinationCity: "",
      destinationProvince: "",

      pickupDate: moment().format("YYYY-MM-DD"),
      etd: moment().format("YYYY-MM-DD"),
      eta: moment().format("YYYY-MM-DD"),
      status: "Ongoing",

      pickupTime: "",
      deliveryTime: "",

      contactName: "",
      contactNumber: "",
      contactEmail: "",

      tagUrgent: false,
      tagImportant: false,
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

    let shippers = [];
    for (let i in log.domestic) {
      if (!shippers.includes(log.domestic[i].shipperConsignee)) {
        shippers.push(log.domestic[i].shipperConsignee);
      }
    }

    return (
      <div className="">
        <button
          type="button"
          className="btn btn-primary mr-3 shadow-sm"
          data-toggle="modal"
          data-target="#domesticLogCreate"
          onClick={this.onOpen}
        >
          <i className="far fa-edit" /> New Job Order
        </button>
        <div
          className="modal fade-in-2"
          id="domesticLogCreate"
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
                {/* @alert */}
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
                        <strong>Associate: </strong>
                        {auth.user.firstName} {auth.user.lastName}
                      </h5>
                    </div>
                  </div>

                  <div className="row">
                    {/* @shipper */}
                    <div className="form-group col-md-6">
                      <label className="mb-1" htmlFor="shipperConsignee">
                        <strong>Shipper/Consignee</strong>
                      </label>

                      <Typeahead
                        ref={typeahead => (this.typeahead = typeahead)}
                        className={classnames("", {
                          "red-border": errors.shipperConsignee
                        })}
                        name="shipperConsignee"
                        onInputChange={value => {
                          this.setState({ shipperConsignee: value });
                        }}
                        value={this.state.shipperConsignee}
                        onChange={value => {
                          if (value !== undefined) {
                            this.setState({ shipperConsignee: value[0] });
                          }
                        }}
                        emptyLabel="(New shipper)"
                        maxLength="100"
                        options={shippers}
                      />
                      {errors.shipperConsignee && (
                        <small className="text-danger">
                          {errors.shipperConsignee}
                        </small>
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
                            For Truck and Sea
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

                    <div className="form-group col-lg-6">
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
                    <div className="form-group col-lg-4 pr-lg-1">
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

                      <small className="form-text text-muted">
                        Building, Street Name, Barangay
                      </small>

                      {errors.originLocation && (
                        <div className="invalid-feedback">
                          {errors.originLocation}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-lg-4 px-lg-1">
                      <label
                        className="mb-1 d-none d-lg-block"
                        htmlFor="originProvinceKey"
                      >
                        &nbsp;
                      </label>
                      <select
                        className={classnames("form-control", {
                          "is-invalid": errors.originProvinceKey
                        })}
                        id="originProvinceKey"
                        name="originProvinceKey"
                        value={this.state.originProvinceKey}
                        onChange={this.onChange}
                      >
                        <option value="" disabled defaultValue>
                          Select a Province
                        </option>

                        {provinces.map((province, index) => {
                          return (
                            <option key={index} value={province.key}>
                              {province.name}
                            </option>
                          );
                        })}
                      </select>

                      <small className="form-text text-muted">Province</small>

                      {errors.originProvinceKey && (
                        <div className="invalid-feedback">
                          {errors.originProvinceKey}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-lg-4 pl-lg-1">
                      <label
                        className="mb-1 d-none d-lg-block"
                        htmlFor="originLocation"
                      >
                        &nbsp;
                      </label>

                      <select
                        disabled={
                          this.state.originProvinceKey === "" ? true : false
                        }
                        className={classnames("form-control", {
                          "is-invalid": errors.originCity
                        })}
                        id="originCity"
                        name="originCity"
                        value={this.state.originCity}
                        onChange={this.onChange}
                      >
                        <option value="" disabled defaultValue>
                          Select a City/Municipality
                        </option>

                        {this.state.originProvinceKey === ""
                          ? null
                          : cities
                              .filter(
                                city =>
                                  city.province === this.state.originProvinceKey
                              )
                              .map((city, index) => {
                                return (
                                  <option key={index} value={city.name}>
                                    {city.name}
                                  </option>
                                );
                              })}
                      </select>

                      <small className="form-text text-muted">
                        City/Municipality
                      </small>

                      {errors.originCity && (
                        <div className="invalid-feedback">
                          {errors.originCity}
                        </div>
                      )}
                    </div>
                  </div>

                  {this.state.modeOfTransport === "Sea" ||
                  this.state.modeOfTransport === "Air" ? (
                    <React.Fragment>
                      {/* @portOfDeparture */}
                      <div className="row">
                        <div className="form-group col-lg-4 pr-lg-1">
                          <label
                            className="mb-1"
                            htmlFor="portOfDepartureLocation"
                          >
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

                          <small className="form-text text-muted">
                            Port Name
                          </small>

                          {errors.portOfDepartureLocation && (
                            <div className="invalid-feedback">
                              {errors.portOfDepartureLocation}
                            </div>
                          )}
                        </div>

                        <div className="form-group col-lg-4 px-lg-1">
                          <label
                            className="mb-1 d-none d-lg-block"
                            htmlFor="portOfDepartureProvinceKey"
                          >
                            &nbsp;
                          </label>
                          <select
                            className={classnames("form-control", {
                              "is-invalid": errors.portOfDepartureProvinceKey
                            })}
                            id="portOfDepartureProvinceKey"
                            name="portOfDepartureProvinceKey"
                            value={this.state.portOfDepartureProvinceKey}
                            onChange={this.onChange}
                          >
                            <option value="" disabled defaultValue>
                              Select a Province
                            </option>

                            {provinces.map((province, index) => {
                              return (
                                <option key={index} value={province.key}>
                                  {province.name}
                                </option>
                              );
                            })}
                          </select>

                          <small className="form-text text-muted">
                            Province
                          </small>

                          {errors.portOfDepartureProvinceKey && (
                            <div className="invalid-feedback">
                              {errors.portOfDepartureProvinceKey}
                            </div>
                          )}
                        </div>

                        <div className="form-group col-lg-4 pl-lg-1">
                          <label
                            className="mb-1 d-none d-lg-block"
                            htmlFor="portOfDepartureCity"
                          >
                            &nbsp;
                          </label>

                          <select
                            disabled={
                              this.state.portOfDepartureProvinceKey === ""
                                ? true
                                : false
                            }
                            className={classnames("form-control", {
                              "is-invalid": errors.portOfDepartureCity
                            })}
                            id="portOfDepartureCity"
                            name="portOfDepartureCity"
                            value={this.state.portOfDepartureCity}
                            onChange={this.onChange}
                          >
                            <option value="" disabled defaultValue>
                              Select a City/Municipality
                            </option>

                            {this.state.portOfDepartureProvinceKey === ""
                              ? null
                              : cities
                                  .filter(
                                    city =>
                                      city.province ===
                                      this.state.portOfDepartureProvinceKey
                                  )
                                  .map((city, index) => {
                                    return (
                                      <option key={index} value={city.name}>
                                        {city.name}
                                      </option>
                                    );
                                  })}
                          </select>

                          <small className="form-text text-muted">
                            City/Municipality
                          </small>

                          {errors.portOfDepartureCity && (
                            <div className="invalid-feedback">
                              {errors.portOfDepartureCity}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* @portOfArrival */}
                      <div className="row">
                        <div className="form-group col-lg-4 pr-lg-1">
                          <label
                            className="mb-1"
                            htmlFor="portOfArrivalLocation"
                          >
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

                          <small className="form-text text-muted">
                            Port Name
                          </small>

                          {errors.portOfArrivalLocation && (
                            <div className="invalid-feedback">
                              {errors.portOfArrivalLocation}
                            </div>
                          )}
                        </div>

                        <div className="form-group col-lg-4 px-lg-1">
                          <label
                            className="mb-1 d-none d-lg-block"
                            htmlFor="portOfArrivalProvinceKey"
                          >
                            &nbsp;
                          </label>
                          <select
                            className={classnames("form-control", {
                              "is-invalid": errors.portOfArrivalProvinceKey
                            })}
                            id="portOfArrivalProvinceKey"
                            name="portOfArrivalProvinceKey"
                            value={this.state.portOfArrivalProvinceKey}
                            onChange={this.onChange}
                          >
                            <option value="" disabled defaultValue>
                              Select a Province
                            </option>

                            {provinces.map((province, index) => {
                              return (
                                <option key={index} value={province.key}>
                                  {province.name}
                                </option>
                              );
                            })}
                          </select>

                          <small className="form-text text-muted">
                            Province
                          </small>

                          {errors.portOfArrivalProvinceKey && (
                            <div className="invalid-feedback">
                              {errors.portOfArrivalProvinceKey}
                            </div>
                          )}
                        </div>

                        <div className="form-group col-lg-4 pl-lg-1">
                          <label
                            className="mb-1 d-none d-lg-block"
                            htmlFor="portOfArrivalCity"
                          >
                            &nbsp;
                          </label>

                          <select
                            disabled={
                              this.state.portOfArrivalProvinceKey === ""
                                ? true
                                : false
                            }
                            className={classnames("form-control", {
                              "is-invalid": errors.portOfArrivalCity
                            })}
                            id="portOfArrivalCity"
                            name="portOfArrivalCity"
                            value={this.state.portOfArrivalCity}
                            onChange={this.onChange}
                          >
                            <option value="" disabled defaultValue>
                              Select a City/Municipality
                            </option>

                            {this.state.portOfArrivalProvinceKey === ""
                              ? null
                              : cities
                                  .filter(
                                    city =>
                                      city.province ===
                                      this.state.portOfArrivalProvinceKey
                                  )
                                  .map((city, index) => {
                                    return (
                                      <option key={index} value={city.name}>
                                        {city.name}
                                      </option>
                                    );
                                  })}
                          </select>

                          <small className="form-text text-muted">
                            City/Municipality
                          </small>

                          {errors.portOfArrivalCity && (
                            <div className="invalid-feedback">
                              {errors.portOfArrivalCity}
                            </div>
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  ) : null}

                  {/* @destination */}
                  <div className="row">
                    <div className="form-group col-lg-4 pr-lg-1">
                      <label className="mb-1" htmlFor="destinationProvinceKey">
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

                      <small className="form-text text-muted">
                        Building, Street Name, Barangay
                      </small>

                      {errors.destinationLocation && (
                        <div className="invalid-feedback">
                          {errors.destinationLocation}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-lg-4 px-lg-1">
                      <label
                        className="mb-1 d-none d-lg-block"
                        htmlFor="destinationCity"
                      >
                        &nbsp;
                      </label>
                      <select
                        className={classnames("form-control", {
                          "is-invalid": errors.destinationProvinceKey
                        })}
                        id="destinationProvinceKey"
                        name="destinationProvinceKey"
                        value={this.state.destinationProvinceKey}
                        onChange={this.onChange}
                      >
                        <option value="" disabled defaultValue>
                          Select a Province
                        </option>

                        {provinces.map((province, index) => {
                          return (
                            <option key={index} value={province.key}>
                              {province.name}
                            </option>
                          );
                        })}
                      </select>

                      <small className="form-text text-muted">Province</small>

                      {errors.destinationProvinceKey && (
                        <div className="invalid-feedback">
                          {errors.destinationProvinceKey}
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
                        disabled={
                          this.state.destinationProvinceKey === ""
                            ? true
                            : false
                        }
                        className={classnames("form-control", {
                          "is-invalid": errors.destinationCity
                        })}
                        id="destinationCity"
                        name="destinationCity"
                        value={this.state.destinationCity}
                        onChange={this.onChange}
                      >
                        <option value="" disabled defaultValue>
                          Select a City/Municipality
                        </option>

                        {this.state.destinationProvinceKey === ""
                          ? null
                          : cities
                              .filter(
                                city =>
                                  city.province ===
                                  this.state.destinationProvinceKey
                              )
                              .map((city, index) => {
                                return (
                                  <option key={index} value={city.name}>
                                    {city.name}
                                  </option>
                                );
                              })}
                      </select>

                      <small className="form-text text-muted">
                        City/Municipality
                      </small>

                      {errors.destinationCity && (
                        <div className="invalid-feedback">
                          {errors.destinationCity}
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
                        <strong>ETD</strong>{" "}
                        <em className="text-muted">&mdash; For Sea and Air</em>
                      </label>
                      <input
                        disabled={
                          this.state.modeOfTransport === "Truck" ? true : false
                        }
                        type="date"
                        className={classnames("form-control", {
                          "is-invalid": errors.etd
                        })}
                        name={
                          this.state.modeOfTransport === "Truck"
                            ? "pickupDate"
                            : "etd"
                        }
                        value={
                          this.state.modeOfTransport === "Truck"
                            ? this.state.pickupDate
                            : this.state.etd
                        }
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
                        min={moment(this.state.etd).format("YYYY-MM-DD")}
                        max="2999-01-01"
                      />
                      {errors.eta && (
                        <div className="invalid-feedback">{errors.eta}</div>
                      )}
                    </div>
                  </div>

                  {this.state.modeOfTransport === "Truck" ? (
                    <div className="row">
                      {/* @pickupTime */}
                      <div className="form-group col-md-6">
                        <label className="mb-1" htmlFor="pickupTime">
                          <strong>Pickup Time</strong>{" "}
                          <span className="text-muted">
                            <em>&mdash; Optional</em>
                          </span>
                        </label>

                        <input
                          type="time"
                          className={classnames("form-control", {
                            "is-invalid": errors.pickupTime
                          })}
                          name="pickupTime"
                          value={this.state.pickupTime}
                          onChange={this.onChange}
                        />
                      </div>

                      <div className="form-group col-md-6">
                        <label className="mb-1" htmlFor="deliveryTime">
                          <strong>Est. Arrival Time</strong>{" "}
                          <span className="text-muted">
                            <em>&mdash; Optional</em>
                          </span>
                        </label>

                        <input
                          type="time"
                          className={classnames("form-control", {
                            "is-invalid": errors.deliveryTime
                          })}
                          name="deliveryTime"
                          value={this.state.deliveryTime}
                          onChange={this.onChange}
                          min={this.state.pickupTime}
                        />
                      </div>
                    </div>
                  ) : null}

                  <div className="row">
                    {/* <div className="form-group col-md-6">
                      <label className="mb-1" htmlFor="status">
                        <strong>Status</strong>
                      </label>

                      <select
                        disabled
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
                    </div> */}

                    <div className="form-group col-md-12">
                      <label className="mb-1" htmlFor="status">
                        <strong>Tags</strong>
                      </label>

                      <div className="form-control">
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

                  {/* @remarks */}
                  <div className="row">
                    <div className="form-group col-12">
                      <label
                        className="mb-1"
                        htmlFor="domesticCreateAdditional"
                      >
                        <strong>Remarks</strong>
                      </label>

                      <textarea
                        className="form-control"
                        name="additional"
                        id="domesticCreateAdditional"
                        onChange={this.onChange}
                        value={this.state.additional}
                      />
                    </div>
                  </div>

                  <div className="modal-footer pb-0 pr-0">
                    <button
                      disabled={log.submitInProgress ? true : false}
                      type="button"
                      className="btn btn-primary"
                      onClick={this.onSubmit}
                    >
                      Create Job Order
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={this.onClose}
                    >
                      Close
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
    createDomesticLog,
    clearSuccess,
    clearErrors,
    clearAlert,
    logoutUser
  }
)(withRouter(DomesticLogCreate));
