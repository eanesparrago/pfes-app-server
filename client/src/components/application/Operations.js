import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  editLog,
  getDomesticLogs,
  getInternationalLogs
} from "../../actions/logsActions";

class Operations extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      isEditable: false
    };

    this.onChange = this.onChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleEdit() {
    this.setState({
      isEditable: !this.state.isEditable
    });
  }

  submitEdit() {
    console.log("STATE", this.state);
    // const log = {
    //   domJo: this.state.domJo,
    //   shipperConsignee: this.state.shipperConsignee,
    //   associate: this.state.associate,
    //   modeOfTransport: this.state.modeOfTransport,
    //   commodity: this.state.commodity,
    //   blAwb: this.state.blAwb,
    //   origin: this.state.origin,
    //   destination: this.state.destination,
    //   etd: this.state.etd,
    //   eta: this.state.eta,
    //   status: this.state.status,
    //   type: this.state.type
    // };
    // this.props.editLog(log);
  }

  render() {
    const { errors, isEditable } = this.state;
    const { log, auth } = this.props;

    return (
      <div className="mt-3">
        <div className="container row">
          <h2 className="mr-3">Status</h2>
        </div>

        <ul className="list-group">
          <li className="list-group-item pb-1">
            <div className="container row">
              <h4 className="mr-3">Preloading</h4>
              {/* Only admin or operations usertype may see these options */}
              {auth.user.userType === "admin" ||
              auth.user.userType === "operations" ? (
                isEditable ? (
                  <button
                    type="button"
                    className="btn btn-primary btn-sm mr-2 mb-3"
                    onClick={this.submitEdit}
                  >
                    Confirm
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm mr-2 mb-3"
                    onClick={this.toggleEdit}
                  >
                    Add Status
                  </button>
                )
              ) : null}

              {auth.user.userType === "admin" ||
              auth.user.userType === "operations" ? (
                isEditable ? (
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary mb-3"
                    onClick={this.toggleEdit}
                  >
                    &times;
                  </button>
                ) : null
              ) : null}
            </div>

            <div className="container">
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center row">
                  <div className="col-6">Permit</div>
                  <div className="col-4">2018-07-24</div>
                  <div className="col-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      // onClick={this.toggleEdit}
                    >
                      Edit
                    </button>
                  </div>
                </li>
               
                <li class="list-group-item d-flex justify-content-between align-items-center row">
                  <div className="col-6">There was a delay</div>
                  <div className="col-4">2018-07-24</div>
                  <div className="col-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      // onClick={this.toggleEdit}
                    >
                      Edit
                    </button>
                  </div>
                </li>
               
                <li class="list-group-item d-flex justify-content-between align-items-center row">
                  <div className="col-6">AWB</div>
                  <div className="col-4">2018-07-31</div>
                  <div className="col-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      // onClick={this.toggleEdit}
                    >
                      Edit
                    </button>
                  </div>
                </li>
               
              </ul>

              {/* <div className="form-group col-md-4">
                  <label className="mb-1" htmlFor="status">
                    <strong>Preloading Status</strong>
                  </label>

                  <select
                    className="form-control"
                    id="status"
                    name="status"
                    // value={this.state.status}
                    // onChange={this.onChange}
                  >
                    <option value="Waiting">Waiting</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Complete">Complete</option>
                    <option value="Void">Void</option>
                  </select>
                </div>

                <div className="form-group col-md-4">
                  <label className="mb-1" htmlFor="remarks">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Remarks"
                    name="remarks"
                    // value={this.state.remarks}
                    // onChange={this.onChange}
                  />
                </div>

                <div className="form-group col-md-4">
                  <label className="mb-1" htmlFor="dateCompleted">
                    Date Completed
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="dateCompleted"
                    // value={this.state.dateCompleted}
                    // onChange={this.onChange}
                  />
                </div> */}
            </div>
          </li>

          <li className="list-group-item pb-1">
            <div className="container row">
              <h4 className="mr-3">Loading</h4>
              {/* Only admin or operations usertype may see these options */}
              {auth.user.userType === "admin" ||
              auth.user.userType === "operations" ? (
                isEditable ? (
                  <button
                    type="button"
                    className="btn btn-primary btn-sm mr-2 mb-3"
                    onClick={this.submitEdit}
                  >
                    Confirm
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm mr-2 mb-3"
                    onClick={this.toggleEdit}
                  >
                    Add Status
                  </button>
                )
              ) : null}

              {auth.user.userType === "admin" ||
              auth.user.userType === "operations" ? (
                isEditable ? (
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary mb-3"
                    onClick={this.toggleEdit}
                  >
                    &times;
                  </button>
                ) : null
              ) : null}
            </div>

            {/* <form noValidate>
              <div className="row">
                <div className="form-group col-md-4">
                  <label className="mb-1" htmlFor="status">
                    <strong>Loading Status</strong>
                  </label>

                  <select
                    className="form-control"
                    id="status"
                    name="status"
                    // value={this.state.status}
                    // onChange={this.onChange}
                  >
                    <option value="Waiting">Waiting</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Complete">Complete</option>
                    <option value="Void">Void</option>
                  </select>
                </div>

                <div className="form-group col-md-4">
                  <label className="mb-1" htmlFor="remarks">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Remarks"
                    name="remarks"
                    // value={this.state.remarks}
                    // onChange={this.onChange}
                  />
                </div>

                <div className="form-group col-md-4">
                  <label className="mb-1" htmlFor="dateCompleted">
                    Date Completed
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="dateCompleted"
                    // value={this.state.dateCompleted}
                    // onChange={this.onChange}
                  />
                </div>
              </div>
            </form> */}
          </li>

          <li className="list-group-item pb-1">
            <div className="container row">
              <h4 className="mr-3">Unloading</h4>
              {/* Only admin or operations usertype may see these options */}
              {auth.user.userType === "admin" ||
              auth.user.userType === "operations" ? (
                isEditable ? (
                  <button
                    type="button"
                    className="btn btn-primary btn-sm mr-2 mb-3"
                    onClick={this.submitEdit}
                  >
                    Confirm
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm mr-2 mb-3"
                    onClick={this.toggleEdit}
                  >
                    Add Status
                  </button>
                )
              ) : null}

              {auth.user.userType === "admin" ||
              auth.user.userType === "operations" ? (
                isEditable ? (
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary mb-3"
                    onClick={this.toggleEdit}
                  >
                    &times;
                  </button>
                ) : null
              ) : null}
            </div>

            {/* <form noValidate>
              <div className="row">
                <div className="form-group col-md-4">
                  <label className="mb-1" htmlFor="status">
                    <strong>Unloading Status</strong>
                  </label>

                  <select
                    className="form-control"
                    id="status"
                    name="status"
                    // value={this.state.status}
                    // onChange={this.onChange}
                  >
                    <option value="Waiting">Waiting</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Complete">Complete</option>
                    <option value="Void">Void</option>
                  </select>
                </div>

                <div className="form-group col-md-4">
                  <label className="mb-1" htmlFor="remarks">
                    Remarks
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Remarks"
                    name="remarks"
                    // value={this.state.remarks}
                    // onChange={this.onChange}
                  />
                </div>

                <div className="form-group col-md-4">
                  <label className="mb-1" htmlFor="dateCompleted">
                    Date Completed
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="dateCompleted"
                    // value={this.state.dateCompleted}
                    // onChange={this.onChange}
                  />
                </div>
              </div>
            </form> */}
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  log: state.log,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editLog, getDomesticLogs, getInternationalLogs }
)(Operations);
