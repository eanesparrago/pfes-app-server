import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { connect } from "react-redux";
import { getAllUsers } from "../../../actions/usersActions";

import logSorting from "../../../utils/logSorting";

import Spinner from "../../common/Spinner";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class UsersTable extends Component {
  constructor() {
    super();
    this.state = {
      sortKey: "userName",
      sortOrder: true,

      users: [],
      loading: true
    };

    this.onClickSort = this.onClickSort.bind(this);
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users) {
      this.setState({ users: nextProps.users.list, loading: false });
    }
  }

  onClickSort(sortKey) {
    if (sortKey === this.state.sortKey) {
      this.setState({
        sortOrder: !this.state.sortOrder
      });
    } else if (sortKey !== this.state.sortKey) {
      this.setState({
        sortKey: sortKey,
        sortOrder: false
      });
    }
  }

  render() {
    const { users, loading } = this.state;
    const { openEditModal } = this.props;
    const { sortKey, sortOrder } = this.state;

    let usersList = users;

    usersList = usersList.sort(logSorting(sortKey, sortOrder));

    const tableBody = usersList.map(user => {
      return (
        <tr
          key={user._id}
          onClick={() => openEditModal(user)}
          style={{ cursor: "pointer" }}
        >
          <td>{user.userName}</td>
          <td>{capitalizeFirstLetter(user.userType)}</td>
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
                    Username{" "}
                    <i
                      className={classnames("far fa-caret-square-down", {
                        "text-primary": sortKey === "userName",
                        "text-secondary": sortKey !== "userName",
                        "fas fa-caret-square-down":
                          sortKey === "userName" && sortOrder === false,
                        "fas fa-caret-square-up":
                          sortKey === "userName" && sortOrder === true
                      })}
                      onClick={() => this.onClickSort("userName")}
                    />
                  </th>

                  <th className="text-nowrap" scope="col">
                    Type{" "}
                    <i
                      className={classnames("far fa-caret-square-down", {
                        "text-primary": sortKey === "userType",
                        "text-secondary": sortKey !== "userType",
                        "fas fa-caret-square-down":
                          sortKey === "userType" && sortOrder === false,
                        "fas fa-caret-square-up":
                          sortKey === "userType" && sortOrder === true
                      })}
                      onClick={() => this.onClickSort("userType")}
                    />
                  </th>

                  <th className="text-nowrap" scope="col">
                    Firstname{" "}
                    <i
                      className={classnames("far fa-caret-square-down", {
                        "text-primary": sortKey === "firstName",
                        "text-secondary": sortKey !== "firstName",
                        "fas fa-caret-square-down":
                          sortKey === "firstName" && sortOrder === false,
                        "fas fa-caret-square-up":
                          sortKey === "firstName" && sortOrder === true
                      })}
                      onClick={() => this.onClickSort("firstName")}
                    />
                  </th>

                  <th className="text-nowrap" scope="col">
                    Lastname{" "}
                    <i
                      className={classnames("far fa-caret-square-down", {
                        "text-primary": sortKey === "lastName",
                        "text-secondary": sortKey !== "lastName",
                        "fas fa-caret-square-down":
                          sortKey === "lastName" && sortOrder === false,
                        "fas fa-caret-square-up":
                          sortKey === "lastName" && sortOrder === true
                      })}
                      onClick={() => this.onClickSort("lastName")}
                    />
                  </th>

                  <th className="text-nowrap" scope="col">
                    Email{" "}
                    <i
                      className={classnames("far fa-caret-square-down", {
                        "text-primary": sortKey === "email",
                        "text-secondary": sortKey !== "email",
                        "fas fa-caret-square-down":
                          sortKey === "email" && sortOrder === false,
                        "fas fa-caret-square-up":
                          sortKey === "email" && sortOrder === true
                      })}
                      onClick={() => this.onClickSort("email")}
                    />
                  </th>

                  <th className="text-nowrap" scope="col">
                    Contact{" "}
                    <i
                      className={classnames("far fa-caret-square-down", {
                        "text-primary": sortKey === "contact",
                        "text-secondary": sortKey !== "contact",
                        "fas fa-caret-square-down":
                          sortKey === "contact" && sortOrder === false,
                        "fas fa-caret-square-up":
                          sortKey === "contact" && sortOrder === true
                      })}
                      onClick={() => this.onClickSort("contact")}
                    />
                  </th>

                  <th className="text-nowrap" scope="col">
                    Active{" "}
                    <i
                      className={classnames("far fa-caret-square-down", {
                        "text-primary": sortKey === "isActive",
                        "text-secondary": sortKey !== "isActive",
                        "fas fa-caret-square-down":
                          sortKey === "isActive" && sortOrder === false,
                        "fas fa-caret-square-up":
                          sortKey === "isActive" && sortOrder === true
                      })}
                      onClick={() => this.onClickSort("isActive")}
                    />
                  </th>

                  <th className="text-nowrap" scope="col">
                    Date Added{" "}
                    <i
                      className={classnames("far fa-caret-square-down", {
                        "text-primary": sortKey === "date",
                        "text-secondary": sortKey !== "date",
                        "fas fa-caret-square-down":
                          sortKey === "date" && sortOrder === false,
                        "fas fa-caret-square-up":
                          sortKey === "date" && sortOrder === true
                      })}
                      onClick={() => this.onClickSort("date")}
                    />
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
