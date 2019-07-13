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
} from "reactstrap";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import Spinner from "../common/Spinner";
import ModelModal from "./ModelModal";
import {
  getModels,
  getBrand,
  deleteModel,
  setCurrentModel
} from "../../actions/modelActions";

import "react-notifications/lib/notifications.css";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { ADD_VERSION, UPDATE_MODEL } from "../../actions/types";
import VersionModal from "./VersionModal";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";

const style = {
  overflowX: "scroll"
};

const { SearchBar } = Search;

class Modeles extends Component {
  columns = [
    {
      dataField: "code",
      text: "Code"
    },
    {
      dataField: "name",
      text: "Nom"
    },
    {
      dataField: "df1",
      isDummyField: true,
      text: "Opérations",
      formatter: this.operationFormatter,
      formatExtraData: this
    }
  ];
  componentDidMount() {
    this.props.getBrand("5d0e64dd6c5d750017f46454");
  }

  operationFormatter(cell, row, index, extra) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          className="float-left mr-1"
          color="danger"
          onClick={() => extra.handleDelete(extra.props, row)}
        >
          <i className="fa fa-spinnerde fa-trash" />
        </Button>
        <ModelModal
          id={row._id}
          type={false}
          name={row.name}
          code={row.code}
          btnColor="warning"
          btnText="&#9998;"
        />
      </div>
    );
  }

  handleDelete = (props, model) => {
    confirmAlert({
      title: "Confirmation",
      message: "Etes-vous sure de vouloir supprimer ce modèle ?",
      buttons: [
        {
          label: "Oui",
          onClick: () => props.deleteModel(model._id)
        },
        {
          label: "Non",
          onClick: () => {}
        }
      ]
    });
  };

  handleOnSelect = (row, isSelect) => {
    this.props.setCurrentModel(row._id);
    console.log(row)
  };

  render() {
    const selectRow = {
      mode: 'radio',
      clickToSelect: true,
      onSelect: this.handleOnSelect
    }
    const { models, loading } = this.props.model;
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
                <CardBody style={style}>
                  <ToolkitProvider
                    keyField="_id"
                    data={models}
                    columns={this.columns}
                    search
                  >
                    {props => (
                      <div>
                        {/* <ExportCSVButton {...props.csvProps}>
                          Export CSV!!
                        </ExportCSVButton> */}
                        <hr />
                        <h3>Rechercher un Modèle:</h3>
                        <SearchBar {...props.searchProps} />
                        <hr />
                        <BootstrapTable
                          {...props.baseProps}
                          keyField="_id"
                          columns={this.columns}
                          data={models}
                          pagination={paginationFactory()}
                          filter={filterFactory()}
                          selectRow={selectRow}
                          className="table-responsive"
                          striped
                          hover
                          condensed
                          responsive
                        />
                      </div>
                    )}
                  </ToolkitProvider>
                  {/*<Table responsive hover>*/}
                    {/*<thead>*/}
                      {/*<tr>*/}
                        {/*<th scope="col">Code</th>*/}
                        {/*<th scope="col">Nom</th>*/}
                        {/*<th scope="col" />*/}
                      {/*</tr>*/}
                    {/*</thead>*/}
                    {/*<tbody>*/}
                      {/*{models.map(model => (*/}
                        {/*<ModelRow*/}
                          {/*model={model}*/}
                          {/*handleDelete={this.props.deleteModel}*/}
                          {/*key={model._id}*/}
                          {/*onClick={() => this.props.setCurrentModel(model._id)}*/}
                        {/*/>*/}
                      {/*))}*/}
                    {/*</tbody>*/}
                  {/*</Table>*/}
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
                    {versions != undefined &&
                      versions.map(version => {
                        return (
                          <li key={version._id}>
                            <h2>{version.name}</h2>
                          </li>
                        );
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
