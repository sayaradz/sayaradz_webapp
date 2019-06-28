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
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";

import "react-notifications/lib/notifications.css";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, {
  Search,
  CSVExport
} from "react-bootstrap-table2-toolkit";

import { ADD_BRAND, UPDATE_BRAND } from "../../actions/types";

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

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
      //filter: textFilter()
    },
    {
      dataField: "name",
      text: "Nom"
      //filter: textFilter()
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
    // console.log(this.props.user);
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

  // handleDelete(product_id) {
  //   confirmAlert({
  //     title: "Confirmation",
  //     message: "Etes-vous sure de vouloir supprimer ce produit ?",
  //     buttons: [
  //       {
  //         label: "Oui",
  //         onClick: () => props.deleteProduct(product_id)
  //       },
  //       {
  //         label: "Non",
  //         onClick: () => {}
  //       }
  //     ]
  //   });
  // }

  operationFormatter(cell, row, index, extra) {
    //console.log(row.PName);
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          className="float-left mr-1"
          color="danger"
          onClick={() => extra.handleDelete(extra.props, row)}
        >
          <i className="fa fa-spinner fa-trash" />
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
                <CardBody style={style}>
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

              <br />
              <br />
            </Col>
          </Row>
        </div>
      );
    }
  }
}

// const handleDelete = (props, brand) => {
//   confirmAlert({
//     title: "Confirmation",
//     message: "Etes-vous sure de vouloir supprimer cette marque ?",
//     buttons: [
//       {
//         label: "Oui",
//         onClick: () => props.handleDelete(brand._id)
//       },
//       {
//         label: "Non",
//         onClick: () => {}
//       }
//     ]
//   });
// };

// function BrandRow(props) {
//   let count = 0;
//   const brand = props.brand;
//   return (
//     <tr key={count++}>
//       <td>
//         <img src={brand.logo} style={{ width: 75, height: 75 }} />
//       </td>
//       <td>{brand.code}</td>
//       <td>{brand.name}</td>
//       <td style={{ display: "flex", justifyContent: "flex-end" }}>
//         <Button
//           className="float-left mr-1"
//           color="danger"
//           onClick={() => handleDelete(props, brand)}
//         >
//           <i className="fa fa-spinner fa-trash" />
//         </Button>
//         <BrandModal
//           id={brand._id}
//           type={UPDATE_BRAND}
//           name={brand.name}
//           code={brand.code}
//           logo={brand.logo}
//           btnColor="warning"
//           btnText="&#9998;"
//         />
//       </td>
//     </tr>
//   );
// }

// class Brands extends Component {
//   componentDidMount() {
//     this.props.getBrands();
//   }

//   render() {
//     const { brands, loading } = this.props.brand;
//     if (!brands || loading) {
//       return (
//         <div className="animated fadeIn">
//           <Row>
//             <Col xl={6}>
//               <Spinner />;
//             </Col>
//           </Row>
//         </div>
//       );
//     } else {
//       return (
//         <div className="animated fadeIn">
//           <Row>
//             <Col xl={12}>
//               <Card>
//                 <CardHeader>
//                   <i className="fa fa-align-justify" /> Marques
//                 </CardHeader>
//                 <CardBody>
//                   <Table responsive hover>
//                     <thead>
//                       <tr>
//                         <th scope="col">Logo</th>
//                         <th scope="col">Code</th>
//                         <th scope="col">Nom</th>
//                         <th scope="col" />
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {brands.map(brand => (
//                         <BrandRow
//                           key={brand._id}
//                           brand={brand}
//                           handleDelete={this.props.deleteBrand}
//                         />
//                       ))}
//                     </tbody>
//                   </Table>
//                 </CardBody>
//               </Card>
//               <Row>
//                 <Col xl={12}>
//                   <BrandModal
//                     id=""
//                     type={ADD_BRAND}
//                     name=""
//                     code=""
//                     logo=""
//                     btnColor="primary"
//                     btnText="Ajouter"
//                   />
//                 </Col>
//               </Row>

//               <br />
//               <br />
//             </Col>
//           </Row>
//         </div>
//       );
//     }
//   }
// }

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
