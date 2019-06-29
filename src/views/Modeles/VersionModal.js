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
import { addVersion } from "../../actions/modelActions";
import { ADD_VERSION } from "../../actions/types";

class VersionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      type: this.props.type === ADD_VERSION ? "Ajouter" : "Mettre à jour",
      name: this.props.name,
      code: this.props.code,
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
    const modelId =  this.props.modelId;
    const version = {
      version: {
      name: this.state.name,
      code: this.state.code,
      },
      modelId
    };
    if (id !== "") {
    } else {
      this.props.addVersion(version);
    }
    this.setState({ name: "", code: "", logo: "", modal: false });
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
            {this.state.type} un Modèle
          </ModalHeader>
          <ModalBody>
            <Form id="form1" onSubmit={this.onSubmit}>
              <FormGroup>
                <Label htmlFor="name">Nom</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  placeholder="Nom de la version.."
                />
                <Label htmlFor="code">Code</Label>
                <Input
                  type="text"
                  id="code"
                  name="code"
                  value={this.state.code}
                  onChange={this.onChange}
                  placeholder="Code de la version.."
                />
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
VersionModal.propTypes = {
  addVersion: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { addVersion: addVersion }
)(VersionModal);
