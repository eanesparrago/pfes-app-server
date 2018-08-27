import React, { Component } from "react";
import moment from "moment";

export default class HolidayPopup extends Component {
  render() {
    const { eventTitle, eventDate } = this.props;
    return (
      <div
        className="modal fade-in"
        id="holidayPopup"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="holidayPopupLabel"
        aria-hidden="true"
        data-backdrop="false"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="holidayPopupLabel">
                {moment(eventDate).format("MMM DD, YYYY")}
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

            <div className="modal-body">{eventTitle}</div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
