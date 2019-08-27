import React, { Component } from "react";
// import PropTypes from "prop-types";
import {
  //   Button,
  //   Card,
  //   CardBody,
  //   CardHeader,
  Col,
  Row,
  Table
} from "reactstrap";
import Spinner from "../common/Spinner";
import { connect } from "react-redux";
import "react-notifications/lib/notifications.css";

// import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class Versions extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Spinner />
          </Col>
        </Row>
      </div>
    );
  }
}

Versions.propTypes = {};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(Versions);

//export default Users;
