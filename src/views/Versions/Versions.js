import React, { Component } from "react";
// import PropTypes from "prop-types";
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
import { connect } from "react-redux";
import "react-notifications/lib/notifications.css";
import PropTypes from "prop-types";
import { getVersions, getVersion } from "../../actions/versionActions";
// import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ADD_VERSION, UPDATE_VERSION } from "../../actions/types";
import VersionModal from "./VersionModal";
import "./Versions.css";

function getChildren(row) {
  let children = [];
  while (
    row.nextElementSibling !== null &&
    row.nextElementSibling.classList.contains("child")
  ) {
    children.push(row.nextElementSibling);
    row = row.nextElementSibling;
  }
  return children;
}

class Versions extends Component {
  componentDidMount() {
    const id = this.props.location.id;
    this.props.getVersions(id);
  }
  childrenToggle(version, e) {
    this.props.getVersion(version._id);
    let row = e.target;
    if (!row.classList.contains("parent")) row = row.parentElement;
    var children = getChildren(row);
    children.forEach(c => {
      if (c.style.display === "none") {
        c.style.display = "contents";
      } else {
        c.style.display = "none";
      }
    });
  }
  render() {
    const { versions, loading } = this.props.version;
    let ver = this.props.version.completeVersions;
    if (!versions || loading) {
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
                  <i className="fa fa-align-justify" /> Versions
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Code</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {versions.map(version => (
                        <tr style={{ display: "contents" }}>
                          <td colSpan="4" style={{ display: "contents" }}>
                            <tr
                              key={version._id}
                              className="parent"
                              onClick={e => this.childrenToggle(version, e)}
                            >
                              <td>
                                <img
                                  alt="logo"
                                  src={version.image_url}
                                  style={{ width: 140, height: 75 }}
                                />
                              </td>
                              <td>{version.name}</td>
                              <td>{version.code}</td>
                              <td
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end"
                                }}
                              >
                                <Button
                                  className="float-left mr-1"
                                  color="danger"
                                >
                                  <i className="fa fa-spinner fa-trash" />
                                </Button>
                                <VersionModal
                                  id={version._id}
                                  type={UPDATE_VERSION}
                                  name={version.name}
                                  code={version.code}
                                  btnColor="warning"
                                  btnText="&#9998;"
                                />
                              </td>
                            </tr>
                            <div className="child" style={{ display: "none" }}>
                              <td colSpan="4">
                                <b>Options:</b>
                                {ver
                                  .find(v => v._id === version._id)
                                  .options.map(o => (
                                    <span className="badge badge-light">
                                      {o.name}
                                    </span>
                                  ))}
                                <br></br>
                                <b>Couleurs:</b>
                                {this.props.version.completeVersions
                                  .find(v => v._id === version._id)
                                  .colors.map(o => (
                                    <span className="badge badge-light">
                                      {o.name}
                                    </span>
                                  ))}
                              </td>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
              <Row>
                <Col xl={12}>
                  <VersionModal
                    id=""
                    type={ADD_VERSION}
                    name=""
                    code=""
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

Versions.propTypes = {
  getVersions: PropTypes.func.isRequired,
  getVersion: PropTypes.func.isRequired,
  version: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  version: state.version
});

export default connect(
  mapStateToProps,
  { getVersions, getVersion }
)(Versions);
