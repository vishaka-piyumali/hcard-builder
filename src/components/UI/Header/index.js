import React from 'react';

class Header extends React.Component {

	render() {
		let _props = this.props;
		return React.createElement('h' + _props.level, _props, _props.children);
	}
}

export default Header;