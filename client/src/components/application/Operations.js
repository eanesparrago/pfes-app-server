import React, { Component } from "react";
import PropTypes from "prop-types";

class Operations extends Component {
  render() {
    return (
      <div>
        <h2 className="mt-3">Status</h2>

        <ul className="list-group">
          <li className="list-group-item pb-1">
            <form noValidate>
              <div className="row">
                <div className="form-group col-md-4">
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
                </div>
              </div>
            </form>
          </li>

          <li className="list-group-item pb-1">
            <form noValidate>
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
            </form>
          </li>

          <li className="list-group-item pb-1">
            <form noValidate>
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
            </form>
          </li>
        </ul>
      </div>
    );
  }
}

export default Operations;
