import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import Spinner from "../common/Spinner";
import OptionsModal from "./OptionsModal.js";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-notifications/lib/notifications.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { getOptions, deleteOption } from "../../actions/optionActions";

const { SearchBar } = Search;

const style = {
  overflowX: "scroll"
};

class Options extends Component {
  componentDidMount() {
    this.props.getOptions();
  }
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

  handleDelete(props, option) {
    confirmAlert({
      title: "Confirmation",
      message: "Etes-vous sure de vouloir supprimer cette option ?",
      buttons: [
        {
          label: "Oui",
          onClick: () => props.deleteOption(option._id)
        },
        {
          label: "Non",
          onClick: () => {}
        }
      ]
    });
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
        <OptionsModal
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

  render() {
    const { options, loading } = this.props.option;

    if (!options || loading) {
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
                  <i className="fa fa-align-justify" /> Options
                </CardHeader>
                <CardBody style={style}>
                  <ToolkitProvider
                    keyField="_id"
                    data={options}
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
                        <h3>Rechercher une option:</h3>
                        <SearchBar {...props.searchProps} />
                        <hr />
                        <BootstrapTable
                          {...props.baseProps}
                          keyField="_id"
                          columns={this.columns}
                          data={options}
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
                  <OptionsModal
                    id=""
                    name=""
                    code=""
                    logo=""
                    type={true}
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

Options.propTypes = {
  getOptions: PropTypes.func.isRequired,
  deleteOption: PropTypes.func.isRequired,
  option: PropTypes.object
};

const mapStateToProps = state => ({
  option: state.option
});

export { Options };

export default connect(
  mapStateToProps,
  { getOptions, deleteOption }
)(Options);
