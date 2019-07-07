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
import { addOption, updateOption } from "../../actions/optionActions";

class OptionsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      type: this.props.type ? "Ajouter" : "Mettre à jour",
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
    const option = {
      name: this.state.name,
      code: this.state.code
    };
    if (this.props.type) {
      this.props.addOption(option);
      this.setState({ modal: false });
    } else {
      this.props.updateOption(id, option);
      this.setState({ name: "", code: "", modal: false });
    }
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button option={this.props.btnColor} onClick={this.toggle}>
          {this.props.btnText}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            {this.state.type} une Option
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
                  placeholder="Nom de l'option.."
                />
                <Label htmlFor="code">Code</Label>
                <Input
                  type="text"
                  id="code"
                  name="code"
                  value={this.state.code}
                  onChange={this.onChange}
                  placeholder="Code de l'option.."
                />

                <FormText className="help-block">
                  Veuillez entrer les informations de l'option
                </FormText>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button form="form1" type="submit" size="lg" option="primary">
              Soumettre
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
OptionsModal.propTypes = {
  addOption: PropTypes.func.isRequired,
  updateOption: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { addOption, updateOption }
)(OptionsModal);
