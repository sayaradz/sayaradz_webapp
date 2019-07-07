import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import Spinner from "../common/Spinner";
import BrandModal from "./BrandModal.js";
import { getBrands, deleteBrand } from "../../actions/brandActions";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";

import "react-notifications/lib/notifications.css";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { ADD_VERSION } from "../../actions/types";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import { ADD_BRAND, UPDATE_BRAND } from "../../actions/types";

const { SearchBar } = Search;

const style = {
  overflowX: "scroll"
};

class Brands extends Component {
  columns = [
    {
      dataField: "logo",
      text: "Logo",
      formatter: (cell, row) => (
        <img width="75px" height="75px" src={cell} alt={row.name} />
      )
    },
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
    this.props.getBrands();
  }

  handleDelete(props, brand) {
    console.log(props);
    confirmAlert({
      title: "Confirmation",
      message: "Etes-vous sure de vouloir supprimer cette marque ?",
      buttons: [
        {
          label: "Oui",
          onClick: () => props.deleteBrand(brand._id)
        },
        {
          label: "Non",
          onClick: () => {}
        }
      ]
    });
  }

  operationFormatter(cell, row, index, extra) {
    //console.log(row.PName);
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          className="float-left mr-1"
          color="danger"
          onClick={() => extra.handleDelete(extra.props, row)}
        >
          <i className="fa fa-spinnerde fa-trash" />
        </Button>
        <BrandModal
          id={row._id}
          type={UPDATE_BRAND}
          name={row.name}
          code={row.code}
          logo={row.logo}
          btnColor="warning"
          btnText="&#9998;"
        />
      </div>
    );
  }

  render() {
    const { brands, loading } = this.props.brand;

    if (!brands || loading) {
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
                <CardBody style={style}>
                  <ToolkitProvider
                    keyField="_id"
                    data={brands}
                    columns={this.columns}
                    search
                    // exportCSV={{
                    //   fileName: "Brands.csv"
                    // }}
                  >
                    {props => (
                      <div>
                        {/* <ExportCSVButton {...props.csvProps}>
                          Export CSV!!
                        </ExportCSVButton> */}
                        <hr />
                        <h3>Rechercher une marque:</h3>
                        <SearchBar {...props.searchProps} />
                        <hr />
                        <BootstrapTable
                          {...props.baseProps}
                          keyField="_id"
                          columns={this.columns}
                          data={brands}
                          pagination={paginationFactory()}
                          filter={filterFactory()}
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
                <Col xl={12}>
                  <BrandModal
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
          </Row>
        </div>
      );
    }
  }
}

Brands.propTypes = {
  getBrands: PropTypes.func.isRequired,
  deleteBrand: PropTypes.func.isRequired,
  brand: PropTypes.object
};

const mapStateToProps = state => ({
  brand: state.brand
});

export { Brands };

export default connect(
  mapStateToProps,
  { getBrands, deleteBrand }
)(Brands);
