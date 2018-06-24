import React from 'react';

import UIHeader from '../UI/Header';

class HCardPreview extends React.Component {

	showSeperator () {
		let { suburb, state } = this.props;
		if (suburb.trim().length > 0 && state.trim().length > 0) {
			return ', ';
		}
	}

	render () {
		const personalData = this.props;
		return (
		<div className="preview">
			<UIHeader level="3">HCard Preview</UIHeader>
			<div className="card">
				<div className="card-header">
					<UIHeader level="2">{personalData.name}</UIHeader>
					<img src={personalData.avatar} alt="Avatar" className="avatar"/>
				</div>
				<div className="card-body">
					<div className="line">
						<span className="label">
							Email
						</span>
						<span className="value">
							{personalData.email}
						</span>
					</div>
					<div className="line">
						<span className="label">
							Phone
						</span>
						<span className="value">
							{personalData.phone}
						</span>
					</div>
					<div className="line">
						<span className="label">
							Address
						</span>
						<span className="value">
							{personalData.addressLine1}
						</span>
					</div>
					<div className="line">
						<span className="value">
							{personalData.suburb}
							{this.showSeperator()}
							{personalData.state}
						</span>
					</div>
					<div className="mobile-col-1-2 col-1-2">
						<div className="line">
						<span className="label">
							PostCode
						</span>
						<span className="value">
							{personalData.postcode}
						</span></div>
					</div>
					<div className="mobile-col-1-2 col-1-2">
						<div className="line">
						<span className="label">
							Country
						</span>
						<span className="value">
							{personalData.country}
						</span></div>
					</div>
				</div>
			</div>
		</div>
	);
	}
}

export default HCardPreview;