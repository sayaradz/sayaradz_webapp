import React, { Component } from 'react';
import { FormGroup, Input, FormText, Label, Form, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFabricant, updateFabricant } from '../../actions/fabricantActions';

class FabricantModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			name: this.props.name,
			error: ''
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
		})
		console.log(this.state.name);
	}
	onSubmit(e) {
		const id = this.props.id;
		e.preventDefault();
		const fabricant = {
			name: this.state.name
		}
		if (id !== '') {
			this.props.updateFabricant(id, fabricant);
		} else {
			this.props.addFabricant(fabricant);
		}
		this.setState({ name: '', modal: false });
	}

	render() {
		return (
			<div>
				<Button color={this.props.btnColor} onClick={this.toggle}>{this.props.btnText}</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
					<ModalHeader toggle={this.toggle}>Ajouter un Fabricant</ModalHeader>
					<ModalBody>
						<Form id="form1" onSubmit={this.onSubmit}>
							<FormGroup>
								<Label htmlFor="name">Nom</Label>
								<Input type="text" id="name" name="name"
									value={this.state.name}
									onChange={this.onChange}
									placeholder="Entrer Nom Fabricant.."
								/>
								<FormText className="help-block">Veuillez entrer le nom du Fabricant</FormText>
							</FormGroup>
						</Form>
					</ModalBody>
					<ModalFooter>
						<Button form="form1" type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i>Soumettre</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
FabricantModal.propTypes = {
	addFabricant: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { addFabricant, updateFabricant })(FabricantModal);