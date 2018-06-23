import React from 'react';

import UIInputField from '../InputField';

class InputFile extends React.Component {

	onButtonClick (event) {
		event.preventDefault();
		this.refs.fileInput.click();
	}

	render () {
		return (
			<div className={this.props.className}>
				<input
					className="hide"
					type="file"
					ref="fileInput"
					onChange={this.props.onChange}
				/>
				<UIInputField
					name="fileUpload"
					type="button"
					className="secondary"
					value="Upload Avatar"
					onClick={this.onButtonClick.bind(this)}
				/>
			</div>
		)
	}
}

export default InputFile;