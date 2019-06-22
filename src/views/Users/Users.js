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
import { getUsers, deleteUser } from "../../actions/userAction";
import { connect } from "react-redux";
import { ADD_USER } from "../../actions/types";

function UserRow(props) {
  const user = props.user;
  return (
    <tr key={user.name}>
      <th scope="row">{user.email}</th>
      <td>{user.name}</td>
      {/* <td>{user.address.city}</td>
      <td>{user.phone}</td> */}
      <td style={{ display: "flex", justifyContent: "flex-end" }}>
        <UserModal user={user} btnColor="warning" btnText="&#9998;" />

        <Button
          className="mx-2"
          color="danger"
          onClick={() => props.handleDelete(user.name)}
        >
          <i className="fa fa-spinner fa-trash" />
        </Button>
      </td>
    </tr>
  );
}

class Users extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getUsers(id);
  }
  render() {
    //const userList = usersData.filter((user) => user.id < 10);
    let { users, loading } = this.props.user;
    console.log(this.props.user);
    if (!users || loading) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xl={6}>
              <Spinner />;
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
                        <th scope="col">email</th>
                        <th scope="col">Nom</th>
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
                          handleDelete={this.props.deleteUser}
                        />
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* <Row>
          <Col xl={12}>
            <UserModal
              id=""
              type={ADD_USER}
              name=""
              code=""
              logo=""
              btnColor="primary"
              btnText="Ajouter"
            />
          </Col>
        </Row> */}
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
