import React from 'react';

class InputField extends React.Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.onInputChange(event);
	}

	render() {
		const input = this.props;
		return (
			<div>
				<label>
					{input.label} {' : '}
					<input name={input.name} type={input.type} value={input.value} onChange={this.handleChange} />
				</label>
				<hr />
			</div>
		);
	}
}

export default InputField