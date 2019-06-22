import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
import FabricantModal from "./FabricantModal.js";
import { getFabricants, deleteFabricant } from "../../actions/fabricantActions";

import "react-notifications/lib/notifications.css";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ADD_FABRICANT, UPDATE_FABRICANT } from "../../actions/types";

const handleDelete = (props, fabricant) => {
  confirmAlert({
    title: "Confirmation",
    message: "Etes-vous sure de vouloir supprimer ce fabricant ?",
    buttons: [
      {
        label: "Oui",
        onClick: () => props.handleDelete(fabricant._id)
      },
      {
        label: "Non",
        onClick: () => {}
      }
    ]
  });
};

function FabricantRow(props) {
  const fabricant = props.fabricant;
  const usersLink = `/fabricants/${fabricant._id}`;
  return (
    <tr>
      <td>{fabricant.name}</td>
      <td style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link
          to={usersLink}
          className="float-left mr-1 btn btn-success"
          id={fabricant._id}
        >
          <i className="fa fa-users" />
        </Link>

        <Button
          className="float-left mr-1"
          color="danger"
          onClick={() => handleDelete(props, fabricant)}
        >
          <i className="fa fa-spinner fa-trash" />
        </Button>

        <FabricantModal
          id={fabricant._id}
          type={UPDATE_FABRICANT}
          name={fabricant.name}
          btnColor="warning"
          btnText="&#9998;"
        />
      </td>
    </tr>
  );
}

class Fabricants extends Component {
  componentDidMount() {
    this.props.getFabricants();
  }

  render() {
    const { fabricants, loading } = this.props.fabricant;
    if (!fabricants || loading) {
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
                  <i className="fa fa-align-justify" /> Fabricants
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">Nom</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {fabricants.map(fabricant => (
                        <FabricantRow
                          fabricant={fabricant}
                          handleDelete={this.props.deleteFabricant}
                          key={fabricant.name}
                        />
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
              <Row>
                <Col xl={12}>
                  <FabricantModal
                    id=""
                    name=""
                    btnColor="primary"
                    btnText="Ajouter"
                    type={ADD_FABRICANT}
                  />
                </Col>
              </Row>

              <br />
              <br />
            </Col>
          </Row>
        </div>
      );
    }
  }
}

Fabricants.propTypes = {
  getFabricants: PropTypes.func.isRequired,
  deleteFabricant: PropTypes.func.isRequired,
  fabricant: PropTypes.object
};

const mapStateToProps = state => ({
  fabricant: state.fabricant
});

export { Fabricants };

export default connect(
  mapStateToProps,
  { getFabricants, deleteFabricant }
)(Fabricants);
