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
import BrandModal from "../Brands/BrandModal.js";
import { getBrands, deleteBrand } from "../../actions/brandActions";
import { getFabricants } from "../../actions/fabricantActions";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";

import "react-notifications/lib/notifications.css";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { UPDATE_BRAND, ADD_BRAND } from "../../actions/types";

const handleDelete = (props, brand, oldFabs) => {
  confirmAlert({
    title: "Confirmation",
    message: "Etes-vous sure de vouloir supprimer cette marque ?",
    buttons: [
      {
        label: "Oui",
        onClick: () => props.rowHandleDelete(brand._id, oldFabs)
      },
      {
        label: "Non",
        onClick: () => {}
      }
    ]
  });
};

function BrandRow(props) {
  let count = 0,
    fabricants = props.fabricants;
  const brand = props.brand,
    fab = fabricants.find(f => f.brands.find(b => b._id === brand._id)),
    fabName = fab ? fab.name : "";
  //Get all old fabricants that were attributed to brand (Next time use filter method instead of map)
  let oldFabs = fabricants.map(f => {
    if (f.brands.find(b => b._id === brand._id)) return f;
    else return null;
  });
  return (
    <tr key={count++}>
      <td>
        <img alt="logo" src={brand.logo} style={{ width: 75, height: 75 }} />
      </td>
      <td>{brand.code}</td>
      <td>{brand.name}</td>
      <td>{fabName}</td>
      <td style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          className="float-left mr-1"
          color="danger"
          onClick={() => handleDelete(props, brand, oldFabs)}
        >
          <i className="fa fa-spinner fa-trash" />
        </Button>
        <BrandModal
          id={brand._id}
          type={UPDATE_BRAND}
          name={brand.name}
          code={brand.code}
          logo={brand.logo}
          btnColor="warning"
          btnText="&#9998;"
        />
      </td>
    </tr>
  );
}

class Stock extends Component {
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
      dataField: "fabricant",
      text: "Fabricant"
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
    this.props.getFabricants();
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
    const { fabricants } = this.props.fabricant;
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
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">Logo</th>
                        <th scope="col">Code</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Fabricant</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {brands.map(brand => (
                        <BrandRow
                          key={brand._id}
                          brand={brand}
                          getFabricants={this.props.getFabricants}
                          fabricants={fabricants}
                          rowHandleDelete={this.props.deleteBrand}
                        />
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
              <Row>
                <Col xl={12}>
                  <BrandModal
                    id=""
                    type={ADD_BRAND}
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

Stock.propTypes = {
  getBrands: PropTypes.func.isRequired,
  deleteBrand: PropTypes.func.isRequired,
  getFabricants: PropTypes.func.isRequired,
  brand: PropTypes.object.isRequired,
  fabricant: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  brand: state.brand,
  fabricant: state.fabricant
});

// export { Brands };

export default connect(
  mapStateToProps,
  { getBrands, deleteBrand, getFabricants }
)(Stock);
