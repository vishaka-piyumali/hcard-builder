import React from 'react';

import UIInputField from '../UI/InputText/InputText';

class HCardBuilder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName:'',
			givenName: '',
			surname: ''
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		alert('A name was submitted: ' + this.state.value);
		event.preventDefault();
	}

	render() {
		return (
			<div className="hcard-builder">
				<div >
					<form onSubmit={this.handleSubmit}>
						<UIInputField name="firstName" type="text" label="First Name" value={this.state.firstName} onInputChange={this.handleInputChange} />
						<UIInputField name="surname"label="Surname" type="text" value={this.state.surname} onInputChange={this.handleInputChange} />
						<UIInputField type="submit" value="Submit" />
					</form>
				</div>
				<div>
					<h1>preview</h1>
					<p>First Name: {this.state.firstName}</p>
					<p>Surname: {this.state.surname}</p>
				</div>
			</div>
		);
	}
}


export default HCardBuilder;
