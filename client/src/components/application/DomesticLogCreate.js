import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import classnames from "classnames";
import { connect } from "react-redux";
import { createDomesticLog, getDomesticLogs } from "../../actions/logsActions";
import { clearErrors } from "../../actions/errorActions";
import { clearSuccess } from "../../actions/successActions";

import isEmpty from "../../validation/is-empty";

class DomesticLogCreate extends Component {
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
      status: "Waiting",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (!isEmpty(nextProps.success)) {
      this.setState({
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
        status: "Waiting",
        errors: {}
      });
      console.log("Success");

      // this.props.clearSuccess();
      this.props.clearErrors();
      this.props.getDomesticLogs();
    }
    // }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      domJo: this.state.domJo,
      shipperConsignee: this.state.shipperConsignee,
      associate: this.state.associate,
      modeOfTransport: this.state.modeOfTransport,
      commodity: this.state.commodity,
      blAwb: this.state.blAwb,
      origin: this.state.origin,
      destination: this.state.destination,
      etd: this.state.etd,
      eta: this.state.eta,
      status: this.state.status
    };

    this.props.createDomesticLog(newUser);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="">
        <button
          type="button"
          className="btn btn-primary mr-3"
          data-toggle="modal"
          data-target="#domesticLogCreate"
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
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* FORM */}
                <form noValidate>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label className="mb-1" htmlFor="domJo">
                        Job order number
                      </label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.domJo
                        })}
                        placeholder="Job order number"
                        name="domJo"
                        value={this.state.domJo}
                        onChange={this.onChange}
                      />
                      {errors.domJo && (
                        <div className="invalid-feedback">{errors.domJo}</div>
                      )}
                    </div>

                    <div className="form-group col-md-6">
                      <label className="mb-1" htmlFor="associate">
                        Associate
                      </label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.associate
                        })}
                        placeholder="Associate"
                        name="associate"
                        value={this.state.associate}
                        onChange={this.onChange}
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
                      />
                      {errors.shipperConsignee && (
                        <div className="invalid-feedback">
                          {errors.shipperConsignee}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-6">
                      <label className="mb-1" htmlFor="modeOfTransport">
                        Mode of Transport
                      </label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.modeOfTransport
                        })}
                        placeholder="Mode of Transport"
                        name="modeOfTransport"
                        value={this.state.modeOfTransport}
                        onChange={this.onChange}
                      />
                      {errors.modeOfTransport && (
                        <div className="invalid-feedback">
                          {errors.modeOfTransport}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row">
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
                      />
                      {errors.commodity && (
                        <div className="invalid-feedback">
                          {errors.commodity}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-6">
                      <label className="mb-1" htmlFor="blAwb">
                        BL/AWB
                      </label>
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.blAwb
                        })}
                        placeholder="BL/AWB"
                        name="blAwb"
                        value={this.state.blAwb}
                        onChange={this.onChange}
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
                      />
                      {errors.eta && (
                        <div className="invalid-feedback">{errors.eta}</div>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
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
                      <option value="Waiting">Waiting</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Complete">Complete</option>
                      <option value="Void">Void</option>
                    </select>

                    {errors.status && (
                      <div className="invalid-feedback">{errors.status}</div>
                    )}
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.onSubmit}
                >
                  Register User
                </button>
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
  getDomesticLogs: PropTypes.func.isRequired,
  clearSuccess: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  success: state.success
});

export default connect(
  mapStateToProps,
  {
    createDomesticLog,
    getDomesticLogs,
    clearSuccess,
    clearErrors
  }
)(withRouter(DomesticLogCreate));
