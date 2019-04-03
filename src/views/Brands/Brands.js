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
import BrandModal from "./BrandModal.js";
import { getBrands, deleteBrand } from "../../actions/brandActions";
import axios from "axios";

import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { ADD_BRAND, UPDATE_BRAND } from "../../actions/types";

const handleDelete = (props, brand) => {
  confirmAlert({
    title: "Confirmation",
    message: "Etes-vous sure de vouloir supprimer cette marque ?",
    buttons: [
      {
        label: "Oui",
        onClick: () => props.handleDelete(brand._id)
      },
      {
        label: "Non",
        onClick: () => {}
      }
    ]
  });
};

function BrandRow(props) {
  let count = 0;
  const brand = props.brand;
  return (
    <tr key={count++}>
      <td>
        <img src={brand.logo} style={{ width: 75, height: 75 }} />
      </td>
      <td>{brand.code}</td>
      <td>{brand.name}</td>
      <td style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          className="float-left mr-1"
          color="danger"
          onClick={() => handleDelete(props, brand)}
        >
          <i class="fa fa-spinner fa-trash" />
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

class Brands extends Component {
  componentDidMount() {
    this.props.getBrands();
  }

  render() {
    const { brands, loading } = this.props.brand;
    if (!brands || loading) {
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
                  <i className="fa fa-align-justify" /> Marques
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">Logo</th>
                        <th scope="col">Code</th>
                        <th scope="col">Nom</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {brands.map(brand => (
                        <BrandRow
                          brand={brand}
                          handleDelete={this.props.deleteBrand}
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
          <NotificationContainer />
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
