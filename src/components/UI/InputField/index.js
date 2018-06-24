import React from 'react';

class InputField extends React.Component {

	renderLabel() {
		const type = this.props.type;

		if (type !== 'button' && type !== 'file') {
			return (
				<label htmlFor={this.props.name}>
					{this.props.label}
				</label>
			)
		}
	}

	renderError() {

		const props = this.props;

		if (props.type === 'button' || props.type === 'file') {
			return (
				null
			)
		}

		let errorClasses =  ['error'];

		if (!props.isValid) {
			errorClasses.push('invalid');
		}

		if (props.hideError) {
			errorClasses.push('hide');
		}

		return (
			<div className={errorClasses.join(' ')}>
				{props.errorMessage}
			</div>
		)
	}

	render() {

		const props = this.props;

		return (
			<div className="input-field">
				{this.renderLabel()}
				<input
					name={props.name}
					type={props.type}
					value={props.value}
					onClick={props.onClick}
					className={props.className}
					onChange={props.onInputChange}
				/>
				{this.renderError()}
			</div>
		);
	}
}

export default InputField;