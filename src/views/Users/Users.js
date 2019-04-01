import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import UserModal from "./UserModal";
import {getUsers} from "../../actions/userAction";
import {connect} from "react-redux";

function UserRow(props) {
  const user = props.user;
  return (
    <tr key={user.name}>
      <th scope="row">{user.email}</th>
      <td>{user.name}</td>
      <td>{user.username}</td>
      <td>{user.address.city}</td>
      <td>{user.phone}</td>
      <td>
        <UserModal
          id={user.name}
          name={user.name}
          btnColor="warning"
          btnText="&#9998;"
        />
      </td>
    </tr>
  )
}

class Users extends Component {

  componentDidMount() {
    this.props.getUsers('Kia')
  }

  render() {

    //const userList = usersData.filter((user) => user.id < 10);
    let {users}  = this.props.user;

    console.log(this.props)
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Utilisateurs
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">email</th>
                      <th scope="col">Nom</th>
                      <th scope="col">Prénom</th>
                      <th scope="col">Adresse</th>
                      <th scope="col">Téléphone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && users.map((user, index) =>
                      <UserRow key={index} user={user} />
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export { Users }

export default connect(
  mapStateToProps,
  { getUsers }
)(Users)

//export default Users;
