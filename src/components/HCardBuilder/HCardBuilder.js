import React from 'react';

import validator from 'validator';

import UIHeader from '../UI/Header';
import UIInputField from '../UI/InputField';
import UIInputFile from '../UI/InputFile';

import defaultAvatar from './default.png';

import HCardPreview from './HCardPreview';

class HCardBuilder extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			avatar: defaultAvatar,
			inputs: [{
					'text': 'Given Name',
					'name': 'givenName',
					'value': '',
					'rules': validator.isAlphanumeric,
					'invalidMessage': 'Invalid input',
					'isValid': true
				},
				{
					'text': 'Surname',
					'name': 'familyName',
					'value': '',
					'rules': validator.isAlphanumeric,
					'invalidMessage': 'Invalid input',
					'isValid': true
				},
				{
					'text': 'Email',
					'name': 'email',
					'value': '',
					'rules': validator.isEmail,
					'invalidMessage': 'Invalid Email',
					'isValid': true
				},
				{
					'text': 'Phone',
					'name': 'phone',
					'value': '',
					'isValid': true
				}
			],
			address: [{
					'text': 'House name or #',
					'name': 'houseNo',
					'value': '',
					'isValid': true
				},
				{
					'text': 'Street',
					'name': 'street',
					'value': '',
					'isValid': true
				},
				{
					'text': 'Suburb',
					'name': 'suburb',
					'value': '',
					'rules': validator.isAlpha,
					'invalidMessage': 'Invalid input for Suburb',
					'isValid': true
				},
				{
					'text': 'State',
					'name': 'state',
					'value': '',
					'rules': validator.isAlpha,
					'invalidMessage': 'Invalid input for State',
					'isValid': true
				},
				{
					'text': 'Postcode',
					'name': 'postcode',
					'value': '',
					'rules': validator.isNumeric,
					'invalidMessage': 'Invalid input for Postcode',
					'isValid': true
				},
				{
					'text': 'Country',
					'name': 'country',
					'value': '',
					'rules': validator.isAlpha,
					'invalidMessage': 'Invalid input for Country',
					'isValid': true
				}
			]
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	getFullName() {
		return this.state.inputs[0].value + ' ' + this.state.inputs[1].value;
	}

	getAddressLine1() {
		return this.state.address[0].value + ' ' + this.state.address[1].value;
	}

	handleChange(idx, dataType, event) {
		const { value } = event.target;
		let data;
		if (dataType === 'personal') {
			data = [...this.state.inputs]
		} else {
			data = [...this.state.address];
		}
		data[idx].value = value;

		this.setState({ data });
	}

	processAvatarUpload (file) {
		let reader = new FileReader();

		if (!/^image\//.test(file.type)) {
			alert('Please choose an image file');
			return;
		}

		reader.addEventListener("load", () => {
			this.setState({
				avatar: reader.result
			});
		}, false);

		if (file) {
			reader.readAsDataURL(file);
		}
	}

	onFileInputChange (event) {
		if (window.FileReader) {
			this.processAvatarUpload(event.target.files[0])
		}
	}

	validateInputs () {
		let personalData = [...this.state.inputs],
			addressData = [...this.state.address],
			isValid = true;

		personalData = personalData.map(function(idx) {
			let validatorCall = (idx && idx.rules) || undefined;

			if (validatorCall !== undefined){
				let args = [];
				idx.isValid = validatorCall(idx.value, ...args, idx.options);
				if (!idx.isValid) {
					isValid = false;
				}
			}
			return idx;
		})

		addressData = addressData.map(function(idx) {
			let validatorCall = (idx && idx.rules) || undefined;

			if (validatorCall !== undefined){
				let args = [];
				idx.isValid = validatorCall(idx.value, ...args, idx.options);
				if (!idx.isValid) {
					isValid = false;
				}
			}
			return idx;
		})

		this.setState({ personalData, addressData });

		return isValid;
	}

	handleSubmit (event) {
		let valid = this.validateInputs();
		if (valid) {
			alert('Thank you.');
		} else {
			alert('Please enter valid inputs.');
		}

		event.preventDefault();
	}

	render() {
		return (
			<div className="hcard-builder grid">
				<div className="form-container col-1-2">
					<UIHeader level="1"> hCard Builder </UIHeader>
					<form onSubmit={this.handleSubmit}>
						<section>
							<UIHeader className="section-header" level="4"> Personal Details </UIHeader>
							{this.state.inputs.map((item, idx) => (
								<div className="col-1-2" key={this.state.inputs[idx].name}>
									<UIInputField
										key={this.state.inputs[idx].name}
										name={this.state.inputs[idx].name}
										type="text"
										label={this.state.inputs[idx].text}
										value={this.state.inputs[idx].value}
										isValid={this.state.inputs[idx].isValid}
										errorMessage={this.state.inputs[idx].invalidMessage}
										onInputChange={this.handleChange.bind(this, idx, 'personal')} />
								</div>
							))}
						</section>
						<section className="address">
							<UIHeader className="section-header" level="4"> Address </UIHeader>
							{this.state.address.map((item, idx) => (
								<div className="col-1-2" key={this.state.address[idx].name}>
									<UIInputField
										key={this.state.address[idx].name}
										name={this.state.address[idx].name}
										type="text"
										label={this.state.address[idx].text}
										value={this.state.address[idx].value}
										isValid={this.state.address[idx].isValid}
										errorMessage={this.state.address[idx].invalidMessage}
										onInputChange={this.handleChange.bind(this, idx, 'address')} />
								</div>
							))}
						</section>
						<section className="cta-group">
							<div className="col-1-2">
								<UIInputFile
									name="fileUpload"
									className="input-field"
									type="button"
									value="Upload Avatar"
									onChange={this.onFileInputChange.bind(this)}
								/>
							</div>
							<div className="col-1-2">
								<UIInputField
									name="fileUpload"
									className="primary"
									type="button"
									value="Create hCard"
									onClick={this.handleSubmit.bind(this)}
								/>
							</div>
						</section>
					</form>
				</div>
				<div className="preview-container col-1-2">
					<HCardPreview
						name={this.getFullName()}
						email={this.state.inputs[2].value}
						phone={this.state.inputs[3].value}
						addressLine1={this.getAddressLine1()}
						suburb={this.state.address[2].value}
						state={this.state.address[3].value}
						postcode={this.state.address[4].value}
						country={this.state.address[5].value}
					    avatar={this.state.avatar}
					/>
				</div>
			</div>
		);
	}
}

export default HCardBuilder;
