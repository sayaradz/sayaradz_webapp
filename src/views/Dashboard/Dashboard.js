import React, { Component } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { getFabricants } from "../../actions/fabricantActions";
import { getBrands } from "../../actions/brandActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      radioSelected: 2
    };
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  componentDidMount() {
    this.props.getFabricants();
    this.props.getBrands();
  }

  render() {
    const fabricantsNumber = this.props.fabricant.fabricants.length;
    const brandsNumber = this.props.brand.brands.length;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div className="text-value">{fabricantsNumber}</div>
                <div>Fabricants disponibles</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: "70px" }} />
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div className="text-value">{brandsNumber}</div>
                <div>Marques disponibles</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: "70px" }} />
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <div className="text-value">?</div>
                <div>Utilisateurs disponibles</div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: "70px" }} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getFabricants: PropTypes.func.isRequired,
  fabricant: PropTypes.object,
  getBrands: PropTypes.func.isRequired,
  brand: PropTypes.object
};

const mapStateToProps = state => ({
  fabricant: state.fabricant,
  brand: state.brand
});

export default connect(
  mapStateToProps,
  { getFabricants, getBrands }
)(Dashboard);
