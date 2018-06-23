import React from 'react';

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
					'value': ''
				},
				{
					'text': 'Surname',
					'name': 'familyName',
					'value': ''
				},
				{
					'text': 'Email',
					'name': 'email',
					'value': ''
				},
				{
					'text': 'Phone',
					'name': 'phone',
					'value': ''
				}
			],
			address: [{
					'text': 'House name or #',
					'name': 'houseNo',
					'value': ''
				},
				{
					'text': 'Street',
					'name': 'street',
					'value': ''
				},
				{
					'text': 'Suburb',
					'name': 'suburb',
					'value': ''
				},
				{
					'text': 'State',
					'name': 'state',
					'value': ''
				},
				{
					'text': 'Postcode',
					'name': 'postcode',
					'value': ''
				},
				{
					'text': 'Country',
					'name': 'country',
					'value': ''
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

	onFileDrop (files) {
		if (window.FileReader) {
			this.processAvatarUpload(files[0])
		}
	}

	handleSubmit(event) {
		alert('form submited: ');
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
								<div className="col-1-2">
									<UIInputField
									key={this.state.inputs[idx].name}
									name={this.state.inputs[idx].name}
									type="text"
									label={this.state.inputs[idx].text}
									value={this.state.inputs[idx].value}
									onInputChange={this.handleChange.bind(this, idx, 'personal')} />
								</div>
							))}
						</section>
						<section className="address">
							<UIHeader className="section-header" level="4"> Address </UIHeader>
							{this.state.address.map((item, idx) => (
								<div className="col-1-2">
									<UIInputField
											key={this.state.address[idx].name}
											name={this.state.address[idx].name}
											type="text"
											label={this.state.address[idx].text}
											value={this.state.address[idx].value}
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
