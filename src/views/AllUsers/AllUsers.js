import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import Spinner from "../common/Spinner";
import { getUsers, updateUserStatus } from "../../actions/allUsersActions";
import { confirmAlert } from "react-confirm-alert";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
  multiSelectFilter,
  Comparator,
  selectFilter
} from "react-bootstrap-table2-filter";

import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-notifications/lib/notifications.css";
import "react-confirm-alert/src/react-confirm-alert.css";

const style = {
  overflowX: "scroll",
  marginRight: "0px",
  paddingRight: "0px"
};
const types = {
  user: "Simple utilisateur",
  manufacturer: "Fabriquant"
};
const status = {
  true: "Autorisé(e)",
  false: "Banni(e)"
};

const { SearchBar } = Search;

class AllUsers extends Component {
  columns = [
    {
      dataField: "picture",
      text: "Photo",
      formatter: (cell, row) => (
        <img width="75px" height="75px" src={cell} alt={row.name} />
      )
    },
    {
      dataField: "name",
      text: "Nom"
    },
    {
      dataField: "role",
      text: "Type ",
      formatter: (cell, row) => (
        <p>{cell === "manufacturer" ? "Fabriquant" : "Simple utilisateur"}</p>
      ),
      filter: selectFilter({
        options: types,
        style: style
      })
    },
    {
      dataField: "status",
      text: "Etat ",
      formatter: (cell, row) => (
        <p>{cell === true ? "Autorisé(e)" : "Banni(e)"}</p>
      ),
      filter: selectFilter({
        options: status
      })
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
    this.props.getUsers();
  }

  operationFormatter(cell, row, index, extra) {
    const values = {
      color: row.status ? "danger" : "success",
      text: row.status ? "Banir" : "Autoriser"
    };
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          className="float-left mr-1"
          color={values.color}
          onClick={() => extra.handleDelete(extra.props, row)}
        >
          {values.text}
        </Button>
      </div>
    );
  }

  handleDelete = (props, user) => {
    const values = {
      message: user.status ? "Bannir" : "Autoriser"
    };
    confirmAlert({
      title: "Confirmation",
      message: `Etes-vous sure de vouloir ${values.message} cet utilisateur ?`,
      buttons: [
        {
          label: "Oui",
          onClick: () => props.updateUserStatus(user.id, !user.status)
        },
        {
          label: "Non",
          onClick: () => {}
        }
      ]
    });
  };

  render() {
    const { allUsers, loading } = this.props.users;
    if (!allUsers || loading) {
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
                    keyField="id"
                    data={allUsers}
                    columns={this.columns}
                    search
                  >
                    {props => (
                      <div>
                        <hr />
                        <h3>Rechercher un utilisateur:</h3>
                        <SearchBar {...props.searchProps} />
                        <hr />
                        <BootstrapTable
                          {...props.baseProps}
                          keyField="id"
                          columns={this.columns}
                          data={allUsers}
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
            </Col>
          </Row>
        </div>
      );
    }
  }
}

AllUsers.propTypes = {
  getUsers: PropTypes.func.isRequired,
  updateUserStatus: PropTypes.func.isRequired
  //   allUsers: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.allUsers
});

export default connect(
  mapStateToProps,
  { getUsers, updateUserStatus }
)(AllUsers);
