import React, { Component } from "react";
import {
  FormGroup,
  Input,
  FormText,
  Label,
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addColor, updateColor } from "../../actions/colorActions";

class ColorsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      type: this.props.type ? "Ajouter" : "Mettre à jour",
      name: this.props.name,
      code: this.props.code,
      value: this.props.value,
      error: ""
    };

    this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    const id = this.props.id;
    e.preventDefault();
    const color = {
      name: this.state.name,
      value: this.state.value,
      code: this.state.code
    };
    if (this.props.type) {
      this.props.addColor(color);
      this.setState({ modal: false });
    } else {
      this.props.updateColor(id, color);
      this.setState({ name: "", code: "", value: "", modal: false });
    }
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button color={this.props.btnColor} onClick={this.toggle}>
          {this.props.btnText}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            {this.state.type} une Couleur
          </ModalHeader>
          <ModalBody>
            <Form id="form1" onSubmit={this.onSubmit}>
              <FormGroup>
                <Label htmlFor="value">Couleur</Label>
                <Input
                  type="color"
                  id="value"
                  name="value"
                  value={this.state.value}
                  onChange={this.onChange}
                  placeholder="La couleur.."
                />
                <Label htmlFor="name">Nom</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  placeholder="Nom de la couleur.."
                />
                <Label htmlFor="code">Code</Label>
                <Input
                  type="text"
                  id="code"
                  name="code"
                  value={this.state.code}
                  onChange={this.onChange}
                  placeholder="Code de la couleur.."
                />

                <FormText className="help-block">
                  Veuillez entrer les informations de la couleur
                </FormText>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button form="form1" type="submit" size="lg" color="primary">
              Soumettre
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
ColorsModal.propTypes = {
  addColor: PropTypes.func.isRequired,
  updateColor: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { addColor, updateColor }
)(ColorsModal);
