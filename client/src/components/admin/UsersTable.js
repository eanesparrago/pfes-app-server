import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllUsers } from "../../actions/usersActions";

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
    const { users } = this.state;

    // console.log(users);

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
      <div className="table-responsive mx-3">
        <table className="table">
          <thead>
            <tr>
              <th scople="col">Username</th>
              <th scople="col">Type</th>
              <th scople="col">Firstname</th>
              <th scople="col">Lastname</th>
              <th scople="col">Email</th>
              <th scople="col">Contact</th>
            </tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </table>
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
