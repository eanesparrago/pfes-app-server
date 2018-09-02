import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllUsers } from "../../../actions/usersActions";

import Spinner from "../../common/Spinner";

class UsersTable extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      loading: true
    };
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users) {
      this.setState({ users: nextProps.users.list, loading: false });
    }
  }

  render() {
    const { users, loading } = this.state;
    const { openEditModal } = this.props;

    const tableBody = users.map(user => {
      return (
        <tr
          key={user._id}
          onClick={() => openEditModal(user)}
          style={{ cursor: "pointer" }}
        >
          <td>{user.userName}</td>
          <td>{user.userType}</td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.email}</td>
          <td>{user.contact}</td>
          <td>{user.isActive ? "YES" : "NO"}</td>
          <td>{user.date.slice(0, 10)}</td>
        </tr>
      );
    });

    return (
      <div className="">
        {loading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : (
          <div className="table-responsive mt-2">
            <table className="pfes-table table table-striped table-hover">
              <thead>
                <tr>
                  <th className="text-nowrap" scope="col">
                    Username
                  </th>

                  <th className="text-nowrap" scope="col">
                    Type
                  </th>

                  <th className="text-nowrap" scope="col">
                    Firstname
                  </th>

                  <th className="text-nowrap" scope="col">
                    Lastname
                  </th>

                  <th className="text-nowrap" scope="col">
                    Email
                  </th>

                  <th className="text-nowrap" scope="col">
                    Contact
                  </th>

                  <th className="text-nowrap" scope="col">
                    Active
                  </th>

                  <th className="text-nowrap" scope="col">
                    Date Added
                  </th>
                </tr>
              </thead>
              <tbody>{tableBody}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

UsersTable.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  { getAllUsers }
)(UsersTable);
