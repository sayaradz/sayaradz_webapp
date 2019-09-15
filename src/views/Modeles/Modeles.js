import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table
} from "reactstrap";
import { Link } from "react-router-dom";

import Spinner from "../common/Spinner";
import ModelModal from "./ModelModal";
import {
  getModels,
  deleteModel,
  setCurrentModel,
  getFabBrands
} from "../../actions/modelActions";
import "react-notifications/lib/notifications.css";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { UPDATE_MODEL, ADD_MODEL } from "../../actions/types";

const handleDelete = (props, model) => {
  confirmAlert({
    title: "Confirmation",
    message: "Etes-vous sure de vouloir supprimer ce modèle ?",
    buttons: [
      {
        label: "Oui",
        onClick: () => props.rowHandleDelete(model)
      },
      {
        label: "Non",
        onClick: () => {}
      }
    ]
  });
};
function ModelRow(props) {
  let count = 0;
  const model = props.model,
    brandName = model.brand.name,
    fabId = props.fabId;
  const versionsLink = {
    pathname: `/models/${model._id}`,
    id: model._id
  };
  return (
    <tr key={count++}>
      <td>{model.name}</td>
      <td>{model.code}</td>
      <td>{brandName}</td>
      <td style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link
          to={versionsLink}
          className="float-left mr-1 btn btn-success"
          id={model._id}
        >
          <i className="fa fa-users" />
        </Link>

        <Button
          className="float-left mr-1"
          color="danger"
          onClick={() => handleDelete(props, model)}
        >
          <i className="fa fa-spinner fa-trash" />
        </Button>
        <ModelModal
          id={model._id}
          type={UPDATE_MODEL}
          name={model.name}
          code={model.code}
          oldBrand={model.brand._id}
          btnColor="warning"
          btnText="&#9998;"
          fabId={fabId}
        />
      </td>
    </tr>
  );
}
class Modeles extends Component {
  componentDidMount() {
    const fabId = this.props.auth.user.manufacturers_access[0];
    this.props.getModels(fabId);
    this.props.getFabBrands(fabId);
  }

  render() {
    const { models, loading } = this.props.model,
      fabId = this.props.auth.user.manufacturers_access[0];
    if (!models || loading) {
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
                  <i className="fa fa-align-justify" /> Marques
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Code</th>
                        <th scope="col">Marque</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {models.map(model => (
                        <ModelRow
                          key={model._id}
                          model={model}
                          brands={this.props.model.brands}
                          rowHandleDelete={this.props.deleteModel}
                          fabId={fabId}
                        />
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
              <Row>
                <Col xl={12}>
                  <ModelModal
                    id=""
                    type={ADD_MODEL}
                    name=""
                    code=""
                    oldBrand=""
                    btnColor="primary"
                    btnText="Ajouter"
                    fabId={fabId}
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

Modeles.propTypes = {
  getModels: PropTypes.func.isRequired,
  deleteModel: PropTypes.func.isRequired,
  setCurrentModel: PropTypes.func.isRequired,
  getFabBrands: PropTypes.func.isRequired,
  model: PropTypes.object,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  model: state.model,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getModels, deleteModel, setCurrentModel, getFabBrands }
)(Modeles);
