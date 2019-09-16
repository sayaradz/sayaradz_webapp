import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';

class InfoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
      const row = this.props.row;
    return (
      <div>
        <Button color="warning" onClick={this.toggle}>Détailles</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Informations sur la commande</ModalHeader>
          <ModalBody>
            <Row>
                <Col md={6}>Envoyée par</Col> <Col md={6}>{row.user.email}</Col><hr/>
                <Col md={6}>Montant</Col> <Col md={6}>{row.amount}</Col><hr/>
                <Col md={6}>Version</Col> <Col md={6}>{row.version}</Col><hr/>
                <Col md={6}>Couleur</Col> <Col md={6}>{row.color}</Col><hr/>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.toggle}>Fermer</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default InfoModal;