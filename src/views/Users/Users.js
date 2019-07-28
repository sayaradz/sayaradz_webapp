import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from "reactstrap";
import Spinner from "../common/Spinner";
import UserModal from "./UserModal";
import { getUsers, deleteUser } from "../../actions/userActions";
import { connect } from "react-redux";
import "react-notifications/lib/notifications.css";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const confirmDelete = props => {
  const user = props.user;
  confirmAlert({
    title: "Confirmation",
    message: "Etes-vous sure de vouloir supprimer cet utilisateur ?",
    buttons: [
      {
        label: "Oui",
        onClick: () => props.handleDelete(props.fabId, user._id)
      },
      {
        label: "Non",
        onClick: () => {}
      }
    ]
  });
};

function UserRow(props) {
  const user = props.user;
  return (
    <tr key={user.name}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td style={{ display: "flex", justifyContent: "flex-end" }}>
        <UserModal
          user={user}
          type={false}
          btnColor="warning"
          btnText="&#9998;"
        />

        <Button
          className="mx-2"
          color="danger"
          onClick={() => confirmDelete(props)}
        >
          <i className="fa fa-spinner fa-trash" />
        </Button>
      </td>
    </tr>
  );
}

class Users extends Component {
  componentDidMount() {
    const id = this.props.location.id;
    this.props.getUsers(id);
  }
  render() {
    //const userList = usersData.filter((user) => user.id < 10);
    let { users, loading } = this.props.user;
    if (!users || loading) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xl={6}>
              <Spinner />
            </Col>
          </Row>
        </div>
      );
    } else {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xl={12}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify" /> Utilisateurs
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Email</th>
                        {/* <th scope="col">Prénom</th> */}
                        {/* <th scope="col">Adresse</th>
                        <th scope="col">Téléphone</th> */}
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <UserRow
                          key={index}
                          user={user}
                          fabId={this.props.location.id}
                          handleDelete={this.props.deleteUser}
                        />
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl={12}>
              <UserModal
                user={{
                  name: "",
                  email: "",
                  password: "",
                  picture: "",
                  role: "manufacturer",
                  fabId: this.props.location.id
                }}
                type={true}
                btnColor="primary"
                btnText="Ajouter"
              />
            </Col>
          </Row>
        </div>
      );
    }
  }
}

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.user
});

export { Users };

export default connect(
  mapStateToProps,
  { getUsers, deleteUser }
)(Users);

//export default Users;
