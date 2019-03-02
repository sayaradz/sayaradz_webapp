import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Spinner from '../common/Spinner';
import FabricantModal from './FabricantModal.js';
import { getFabricants, deleteFabricant } from '../../actions/fabricantActions';
import axios from 'axios';

function FabricantRow(props) {
  const fabricant = props.fabricant;
  const id = props.id;
  return (
    <tr key={fabricant._id.toString()}>
      <th scope="row">{id}</th>
      <td>{fabricant.name}</td>
      <td>
        <Button className="float-left mr-1" color="danger" onClick={() => props.handleDelete(fabricant._id)}>&#10006;</Button>
        <FabricantModal id={fabricant._id} name={fabricant.name} btnColor="warning" btnText="&#9998;"></FabricantModal>
      </td>

    </tr>
  )
}

class Fabricants extends Component {
  componentDidMount() {
    this.props.getFabricants();
  }

  render() {
    const { fabricants, loading } = this.props.fabricant;
    if (fabricants === null || loading) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xl={6}>
              <Spinner />;
          </Col>
          </Row>
        </div>
      )
    } else {
      let count = 1;
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xl={6}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Fabricants
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">id</th>
                        <th scope="col">name</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        fabricants.map(fabricant =>
                          <FabricantRow fabricant={fabricant} id={count++}
                            handleDelete={this.props.deleteFabricant} />
                        )}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
              <FabricantModal id="" name="" btnColor="primary" btnText="Ajouter"></FabricantModal>
              <br /><br />
            </Col>
          </Row>
        </div>
      )
    }
  }
}

Fabricants.propTypes = {
  getFabricants: PropTypes.func.isRequired,
  deleteFabricant: PropTypes.func.isRequired,
  fabricant: PropTypes.object
};

const mapStateToProps = state => ({
  fabricant: state.fabricant
});

export default connect(mapStateToProps, { getFabricants, deleteFabricant })(Fabricants);