import React from 'react'

class MapSquare extends React.PureComponent {
	componentDidMount () {
		console.log("mounted")
	}

	state = {
		isLoaded: false,
	}

	renderLoading = () => (
		<div className={'map-square loading'}/>
	)

	render () {
		return this.state.isLoaded ? null : this.renderLoading()
	}
}

export default MapSquare
