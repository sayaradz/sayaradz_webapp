import React, { Component } from "react";
import {
  FormGroup,
  Input,
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
import {
  addModel,
  getFabBrands,
  updateModel
} from "../../actions/modelActions";
import { ADD_VERSION } from "../../actions/types";

class ModelModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      type: this.props.type === ADD_VERSION ? "Ajouter" : "Mettre à jour",
      name: this.props.name,
      code: this.props.code,
      brands: [],
      brand: "",
      error: ""
    };

    this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      brands: this.props.model.brands
    });
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
    e.preventDefault();
    const modelId = this.props.id,
      newBrandId =
        this.state.brand === "" ? this.state.brands[0]._id : this.state.brand,
      oldBrandId = this.props.oldBrand;
    const model = {
      name: this.state.name,
      code: this.state.code
    };
    if (modelId !== "") {
      this.props.updateModel(modelId, model, oldBrandId, newBrandId);
    } else {
      this.props.addModel(model, newBrandId);
    }
    this.setState({ name: "", code: "", modal: false });
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
                  placeholder="Nom du modèle.."
                />
                <Label htmlFor="code">Code</Label>
                <Input
                  type="text"
                  id="code"
                  name="code"
                  value={this.state.code}
                  onChange={this.onChange}
                  placeholder="Code du modèle.."
                />
                <Label htmlFor="brand">Marque</Label>
                <Input
                  type="select"
                  name="brand"
                  id="brand"
                  onChange={this.onChange}
                  placeholder="La marque propiétaire.."
                >
                  {this.state.brands.map(f => (
                    <option key={f._id} value={f._id}>
                      {f.name}
                    </option>
                  ))}
                </Input>
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
ModelModal.propTypes = {
  addModel: PropTypes.func.isRequired,
  updateModel: PropTypes.func.isRequired,
  getFabBrands: PropTypes.func.isRequired,
  model: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  model: state.model
});

export default connect(
  mapStateToProps,
  { addModel, getFabBrands, updateModel }
)(ModelModal);
