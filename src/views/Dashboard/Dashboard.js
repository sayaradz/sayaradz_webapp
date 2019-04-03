import React, { Component, lazy, Suspense } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table
} from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import { getFabricants } from "../../actions/fabricantActions";
import { getBrands } from "../../actions/brandActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Widget03 = lazy(() => import("../../views/Widgets/Widget03"));

const brandPrimary = getStyle("--primary");
const brandSuccess = getStyle("--success");
const brandInfo = getStyle("--info");
const brandWarning = getStyle("--warning");
const brandDanger = getStyle("--danger");

// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const mainChart = {
  labels: [
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
    "Su",
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
    "Su",
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
    "Su",
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
    "Su"
  ],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 2,
      data: data1
    },
    {
      label: "My Second dataset",
      backgroundColor: "transparent",
      borderColor: brandSuccess,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 2,
      data: data2
    },
    {
      label: "My Third dataset",
      backgroundColor: "transparent",
      borderColor: brandDanger,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3
    }
  ]
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: "index",
    position: "nearest",
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return {
          backgroundColor:
            chart.data.datasets[tooltipItem.datasetIndex].borderColor
        };
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }
    ]
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  }
};

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

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <div className="text-value">?</div>
                <div>Members online</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: "70px" }} />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Traffic</CardTitle>
                    <div className="small text-muted">April 2019</div>
                  </Col>
                </Row>
                <div
                  className="chart-wrapper"
                  style={{ height: 300 + "px", marginTop: 40 + "px" }}
                >
                  {/* <Line data={mainChart} options={mainChartOpts} height={300} /> */}
                  <Line options={mainChartOpts} height={300} />
                </div>
              </CardBody>
              {/* <CardFooter>
                <Row className="text-center">
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Visits</div>
                    <strong>29.703 Users (40%)</strong>
                    <Progress
                      className="progress-xs mt-2"
                      color="success"
                      value="40"
                    />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                    <div className="text-muted">Unique</div>
                    <strong>24.093 Users (20%)</strong>
                    <Progress
                      className="progress-xs mt-2"
                      color="info"
                      value="20"
                    />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Pageviews</div>
                    <strong>78.706 Views (60%)</strong>
                    <Progress
                      className="progress-xs mt-2"
                      color="warning"
                      value="60"
                    />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">New Users</div>
                    <strong>22.123 Users (80%)</strong>
                    <Progress
                      className="progress-xs mt-2"
                      color="danger"
                      value="80"
                    />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                    <div className="text-muted">Bounce Rate</div>
                    <strong>Average Rate (40.15%)</strong>
                    <Progress
                      className="progress-xs mt-2"
                      color="primary"
                      value="40"
                    />
                  </Col>
                </Row>
              </CardFooter> */}
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
