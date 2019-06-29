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
import Spinner from "../common/Spinner";
import ModelModal from "./ModelModal";
import { getModels, getBrand, deleteModel, setCurrentModel } from "../../actions/modelActions";

import "react-notifications/lib/notifications.css";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { ADD_VERSION, UPDATE_MODEL } from "../../actions/types";
import VersionModal from "./VersionModal";

const handleDelete = (props, model) => {
  confirmAlert({
    title: "Confirmation",
    message: "Etes-vous sure de vouloir supprimer ce modèle ?",
    buttons: [
      {
        label: "Oui",
        onClick: () => props.handleDelete(model._id)
      },
      {
        label: "Non",
        onClick: () => {}
      }
    ]
  });
};

function ModelRow(props) {
  const model = props.model;
  return (
    <tr onClick={props.onClick}>
      <td>{model.code}</td>
      <td>{model.name}</td>
      <td style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          className="float-left mr-1"
          color="danger"
          onClick={() => handleDelete(props, model)}
        >
          <i className="fa fa-spinnerde fa-trash" />
        </Button>
        <ModelModal
          id={model._id}
          type={UPDATE_MODEL}
          name={model.name}
          code={model.code}
          btnColor="warning"
          btnText="&#9998;"
        />
      </td>
    </tr>
  );
}

class Modeles extends Component {
  componentDidMount() {
    //this.props.getModels();
    this.props.getBrand(this.props.match.params.id);
  }

  render() {
    const { models, loading } = this.props.model;
    if (!models || loading) {
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
      var current_model = this.props.model.current_model;
      const versions = current_model.versions;
      const marque = this.props.model.brand.name;
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xl={6}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify" /> Modèles
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                    <tr>
                      <th scope="col">Code</th>
                      <th scope="col">Nom</th>
                      <th scope="col" />
                    </tr>
                    </thead>
                    <tbody>
                    {models.map(model => (
                      <ModelRow
                        model={model}
                        handleDelete={this.props.deleteModel}
                        key={model._id}
                        onClick={() =>this.props.setCurrentModel(model)}
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
                    type={ADD_VERSION}
                    name=""
                    code=""
                    logo=""
                    btnColor="primary"
                    btnText="Ajouter"
                  />
                </Col>
              </Row>
              <br />
              <br />
            </Col>

            <Col xl={6}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify" /> Détailles
                </CardHeader>
                <CardBody>
                  <VersionModal
                    id=""
                    type={ADD_VERSION}
                    name=""
                    code=""
                    modelId={current_model._id}
                    btnColor="primary"
                    btnText="Ajouter une version"
                  />
                  <h1>Nom : {current_model.name}</h1>
                  <h1>Code : {current_model.code}</h1>
                  <h1>Marque : {marque}</h1>
                  <h1>Fabriquant : {current_model.name}</h1>
                  <h1>Versions : </h1>
                  <ul>
                    {versions != undefined && versions.map(version => {
                      return <li key={version._id}><h2>{version.name}</h2></li>
                    })}
                  </ul>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

Modeles.propTypes = {
  getModels: PropTypes.func.isRequired,
  getBrand: PropTypes.func.isRequired,
  deleteModel: PropTypes.func.isRequired,
  setCurrentModel: PropTypes.func.isRequired,
  model: PropTypes.object
};

const mapStateToProps = state => ({
  model: state.model
});

export { Modeles };

export default connect(
  mapStateToProps,
  { getModels, getBrand, deleteModel, setCurrentModel }
)(Modeles);