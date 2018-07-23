import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { getAllUsers } from "../../actions/usersActions";
import { clearRegister } from "../../actions/registerActions";
import { clearErrors } from "../../actions/errorActions";

import isEmpty from "../../validation/is-empty";

class DomesticLogCreate extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      userType: "",
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.register) {
      if (!isEmpty(nextProps.register)) {
        this.setState({
          userName: "",
          userType: "",
          firstName: "",
          lastName: "",
          email: "",
          contact: "",
          password: "",
          password2: "",
          errors: {}
        });
        console.log("Success");

        this.props.clearRegister();
        this.props.clearErrors();
        this.props.getAllUsers();
      }
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      userName: this.state.userName,
      userType: this.state.userType,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      contact: this.state.contact,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser);

    console.log("Submit clicked");
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="">
        <button
          type="button"
          className="btn btn-primary mr-3"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          New Job Order
        </button>
        <div
          className="modal fade"
          id="exampleModal"
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
                  </div>

                  <div className="form-group">
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
                      <div className="invalid-feedback">{errors.associate}</div>
                    )}
                  </div>

                  <div className="row">
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
                      <option label=" " />
                      <option value="waiting">Waiting</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="complete">Complete</option>
                      <option value="void">Void</option>
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

DomesticLogCreate.propTypes = {};

const mapStateToProps = state => ({
  // errors: state.errors,
  // register: state.register
});

export default connect(
  mapStateToProps,
  {
    // registerUser,
    // getAllUsers,
    // clearRegister,
    // clearErrors
  }
)(withRouter(DomesticLogCreate));
