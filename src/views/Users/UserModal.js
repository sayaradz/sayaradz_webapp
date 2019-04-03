import React, { Component } from 'react'
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
} from 'reactstrap';
import { connect } from 'react-redux';

class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      user: this.props.user,
      error: ''
    };

    this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit(e) {
    const id = this.props.id;
    e.preventDefault();
    const user = {
      name: this.state.user.name,
      email: this.state.user.email
    };
    if (id !== '') {
      this.props.updateUser(id, user)
    } else {
      //this.props.addFabricant(fabricant)
    }
    this.setState({ name: '', modal: false })
  }

  render() {
    const {user} = this.state;
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                <Label htmlFor="email">e-mail</Label>
                <Input
                  type="text"
                  id="email"
                  name="name"
                  value={user.email}
                  onChange={this.onChange}
                  placeholder="email.."
                />

                <Label htmlFor="Nom">Nom</Label>
                <Input
                  type="text"
                  id="nom"
                  name="name"
                  value={user.name}
                  onChange={this.onChange}
                  placeholder="Nom.."
                />

                <Label htmlFor="Nom">Prénom</Label>
                <Input
                  type="text"
                  id="nom"
                  name="name"
                  value={user.username}
                  onChange={this.onChange}
                  placeholder="Nom.."
                />

                <Label htmlFor="Nom">Adresse</Label>
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
    )
  }
}


const mapStateToProps = state => ({})

export default connect(
  mapStateToProps,
  {  }
)(UserModal)
