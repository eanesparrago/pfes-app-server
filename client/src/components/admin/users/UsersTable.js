import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllUsers } from "../../../actions/usersActions";
import spinner from "../../../img/spinner.gif";

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
      this.setState({ users: nextProps.users, loading: false });
    }
  }

  render() {
    const { users, loading } = this.state;

    const tableBody = users.map(user => {
      return (
        <tr key={user._id}>
          <td>{user.userName}</td>
          <td>{user.userType}</td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.email}</td>
          <td>{user.contact}</td>
        </tr>
      );
    });

    return (
      <div className="">
        {loading ? (
          <div className="text-center">
            <img src={spinner} alt="Loading spinner" />
          </div>
        ) : (
          <div className="table-responsive  mt-2">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Type</th>
                  <th scope="col">Firstname</th>
                  <th scope="col">Lastname</th>
                  <th scope="col">Email</th>
                  <th scope="col">Contact</th>
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
  users: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  { getAllUsers }
)(UsersTable);
