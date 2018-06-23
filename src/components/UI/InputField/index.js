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
			</div>
		);
	}
}

export default InputField;