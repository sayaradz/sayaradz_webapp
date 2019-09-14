import React, { Component } from 'react';
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Row, Card, CardBody, Col, CardHeader, Button } from 'reactstrap'
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import { connect } from 'react-redux'
import Spinner from "../common/Spinner";


import { getOrders, acceptOrder, rejectOrder } from '../../actions/commandesActions';
import InfoModal from './InfoModal';

const { SearchBar } = Search;
const style = {
    overflowX: "scroll"
};
class Commandes extends Component {
    columns = [
        {
            dataField: "version",
            text: "Version"
        },
        {
            dataField: "color",
            text: "Couleur"
        },
        {
            dataField: "order_date",
            text: "Date commande"
        },
        {
            dataField: "amount",
            text: "Montant"
        },
        {
            dataField: "status",
            text: "Etat"
        },
        {
            dataField: "df1",
            isDummyField: true,
            text: "Opérations",
            formatter: this.operationFormatter,
            formatExtraData: this
        }
    ];
    accepter = (props, row) => {
        this.props.acceptOrder(row._id)
    }
    rejeter = (props, row) => {
        this.props.rejectOrder(row._id)
    }
    operationFormatter(cell, row, index, extra) {
        if(row.status === "PENDING"){
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                    className="float-left mr-1"
                    color="success"
                    onClick={() => extra.accepter(extra.props, row)}
                >
                    Accepter
                </Button>
                <Button
                    className="float-left mr-1"
                    color="danger"
                    onClick={() => extra.rejeter(extra.props, row)}
                >
                    Rejeter
                </Button>
                <InfoModal row ={row}/>
            </div>
        );}
        else{
            return (
                <div style={{ display: "flex", justifyContent: "center" }}>
                <InfoModal row ={row}/>
                </div>
            )
        }
    }

    componentDidMount() {
        this.props.getOrders();
    }

    render() {
        const { orders, loading } = this.props.order

        return (
            (!orders || loading) ?
                <div className="animated fadeIn">
                    <Row>
                        <Col xl={6}>
                            <Spinner />
                        </Col>
                    </Row>
                </div> :
                <Row>
                    <Col xl={12}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify" /> Commandes
                </CardHeader>
                            <CardBody style={style}>
                                <ToolkitProvider
                                    keyField="_id"
                                    data={orders}
                                    columns={this.columns}
                                    search
                                >
                                    {props => (
                                        <div>
                                            <hr />
                                            <h3>Rechercher une Commande:</h3>
                                            <SearchBar {...props.searchProps} />
                                            <hr />
                                            <BootstrapTable
                                                {...props.baseProps}
                                                keyField="_id"
                                                columns={this.columns}
                                                data={orders}
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
        );
    }
}

export { Commandes };
const mapStateToProps = state => ({
    order: state.order
});

export default connect(
    mapStateToProps,
    { getOrders, acceptOrder, rejectOrder }
)(Commandes);