import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import Spinner from "../common/Spinner";
import {
  getVehiclesByManufacturer,
  addVehicle
} from "../../actions/VehicleActions";
import { NotificationManager } from "react-notifications";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-notifications/lib/notifications.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import csvToJson from "../../utils/csvTojson";

const style = {
  display: "flex",
  justifyContent: "flex-end"
};

const { SearchBar } = Search;

let fileReader = null;

class Stock extends Component {
  state = {
    inputFile: null
  };

  columns = [
    {
      dataField: "chassis_number",
      text: "Chassis"
    },
    {
      dataField: "model",
      text: "Modéle"
    },
    {
      dataField: "version",
      text: "Version"
    }
    // {
    //   dataField: "qty",
    //   text: "Quantité"
    // }
  ];

  componentDidMount() {
    let id = this.props.auth.user.manufacturers_access[0];
    console.log(this.props.auth.user);
    this.props.getVehiclesByManufacturer(id);
  }

  triggerFileInput = () => {
    this.inputFile.click();
  };

  handleFileRead = e => {
    const data = fileReader.result;
    const res = csvToJson(data, ["chassis_number", "model", "version"]);

    // console.log("entered");

    if (res.error) {
      NotificationManager.error(
        "Le format du fichier de stock choisi est incorrect",
        "Stock"
      );
    } else {
      let jsonData = res.data;
      jsonData.map(d => {
        d.chassis_number = parseInt(d.chassis_number);
      });
      // axios call
      this.props.addVehicle(jsonData);
      // console.log(jsonData);
    }
  };

  uploadFile = e => {
    const file = e.target.files[0];
    fileReader = new FileReader();
    fileReader.onloadend = this.handleFileRead;
    fileReader.readAsText(file);
  };

  render() {
    const { vehicles, loading } = this.props.vehicle;
    // console.log(vehicles);
    if (!vehicles || loading) {
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
                  <i className="fa fa-align-justify" /> Stock
                </CardHeader>
                <CardBody>
                  <ToolkitProvider
                    keyField="_id"
                    data={vehicles}
                    columns={this.columns}
                    search
                  >
                    {props => (
                      <div>
                        <hr />
                        <h3>Rechercher un véhicule:</h3>
                        <SearchBar {...props.searchProps} />
                        <hr />
                        <BootstrapTable
                          {...props.baseProps}
                          keyField="_id"
                          columns={this.columns}
                          data={vehicles}
                          pagination={paginationFactory()}
                          className="table-responsive"
                          striped
                          hover
                          condensed
                          responsive
                        />
                      </div>
                    )}
                  </ToolkitProvider>
                </CardBody>
              </Card>
              <Row>
                <Col xl={12} style={style}>
                  <input
                    type="file"
                    ref={input => (this.inputFile = input)}
                    onChange={this.uploadFile}
                    hidden
                  />
                  <Button onClick={this.triggerFileInput} color="primary">
                    Upload fichier de stock
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

Stock.propTypes = {
  getVehiclesByManufacturer: PropTypes.func.isRequired,
  addVehicle: PropTypes.func.isRequired
  //   allUsers: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  vehicle: state.vehicle,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getVehiclesByManufacturer, addVehicle }
)(Stock);
