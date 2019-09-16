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
import { addVersion, getVersion } from "../../actions/versionActions";
import { getColors } from "../../actions/colorActions";
import { getOptions } from "../../actions/optionActions";
import { ADD_VERSION } from "../../actions/types";
import Select from "react-select";

class VersionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      id: this.props.id,
      type: this.props.type === ADD_VERSION ? "Ajouter" : "Mettre à jour",
      name: this.props.name,
      code: this.props.code,
      selectedOption: [],
      selectedColor: [],
      error: ""
    };

    this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.getColors();
    this.props.getVersion(this.state.id);
    this.props.getOptions();
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
    const id = this.props.id;
    const { modelId } = this.props;
    const versionData = {
      version: {
        name: this.state.name,
        code: this.state.code,
        options: this.state.selectedOption,
        colors: this.state.selectedColor
      },
      modelId
    };
    if (id !== "") {
    } else {
      this.props.addVersion(versionData);
    }
    this.setState({ name: "", code: "", logo: "", modal: false });
  }

  handleOptionChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  handleColorChange = selectedColor => {
    this.setState({ selectedColor });
    console.log(`Color selected:`, selectedColor);
  };
  render() {
    const { options } = this.props.option,
      { colors } = this.props.color;
    let ops = [
      ...options.map(o => ({
        value: o._id,
        label: o.name
      }))
    ];
    let cls = [
      ...colors.map(o => ({
        value: o._id,
        label: o.name
      }))
    ];
    const type = this.state.type === "Ajouter" ? false : true;
    let version = type
      ? this.props.version.completeVersions.find(v => v._id === this.state.id)
      : null;

    // if (type)
    // this.setState({
    //   selectedOption:
    //     this.state.type === "Ajouter"
    //       ? [...version.options.map(o => ({ value: o._id, label: o.name }))]
    //       : null,
    //   selectedColor:
    //     this.state.type === "Ajouter"
    //       ? [...version.colors.map(o => ({ value: o._id, label: o.name }))]
    //       : null
    // });
    let selectedOption0 = type
      ? [...version.options.map(o => ({ value: o._id, label: o.name }))]
      : null;
    let selectedColor0 = type
      ? [...version.colors.map(o => ({ value: o._id, label: o.name }))]
      : null;
    // this.setState({
    //   selectedColor: this.state.selectedColor.push(...selectedColor0),
    //   selectedOption: this.state.selectedOption.push(...selectedOption0)
    // });
    const { selectedOption, selectedColor } = this.state;
    // let ops = ver.find(v => v._id === this.state.id)
    // .options
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
                <Label htmlFor="code">Options</Label>
                <Select
                  value={selectedOption}
                  onChange={this.handleOptionChange}
                  options={ops}
                  isMulti={true}
                />
                <Label htmlFor="code">Couleurs</Label>
                <Select
                  value={selectedColor}
                  onChange={this.handleColorChange}
                  options={cls}
                  isMulti={true}
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
  getOptions: PropTypes.func.isRequired,
  getColors: PropTypes.func.isRequired,
  getVersion: PropTypes.func.isRequired,
  color: PropTypes.object.isRequired,
  version: PropTypes.object.isRequired,
  option: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  option: state.option,
  color: state.color,
  version: state.version
});

export default connect(
  mapStateToProps,
  { addVersion, getOptions, getColors, getVersion }
)(VersionModal);
