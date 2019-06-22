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
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addUser, updateUser } from "../../actions/userAction";

class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: this.props.user.name,
      email: this.props.user.email,
      password: this.props.user.password,
      picutre: this.props.user.picture,
      role: this.props.user.role,
      fabId: this.props.user.fabId,
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
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      picture: this.state.picture,
      role: "user"
    };
    if (id !== "") {
      this.props.updateUser(id, user);
    } else {
      this.props.addUser(this.state.fabId, user);
    }
    this.setState({
      name: "",
      email: "",
      password: "",
      picture: "",
      modal: false
    });
  }

  render() {
    const { user } = this.state;
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
          <ModalHeader toggle={this.toggle}>Mettre a jour</ModalHeader>
          <ModalBody>
            <Form id="form1" onSubmit={this.onSubmit}>
              <FormGroup>
                <Label htmlFor="Nom">Nom</Label>
                <Input
                  type="text"
                  id="nom"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  placeholder="Nom.."
                />

                <Label htmlFor="email">e-mail</Label>
                <Input
                  type="text"
                  id="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  placeholder="email.."
                />

                <Label htmlFor="password">password</Label>
                <Input
                  type="text"
                  id="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  placeholder="password.."
                />

                {/* <Label htmlFor="Nom">Adresse</Label>
                <Input
                  type="text"
                  id="nom"
                  name="name"
                  value={user.address.city}
                  onChange={this.onChange}
                  placeholder="Nom.."
                />

                <Label htmlFor="Nom">Téléphone</Label>
                <Input
                  type="text"
                  id="nom"
                  name="name"
                  value={user.phone}
                  onChange={this.onChange}
                  placeholder="Nom.."
                /> */}
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
const mapStateToProps = state => ({});

UserModal.propTypes = {
  addUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { updateUser, addUser }
)(UserModal);
