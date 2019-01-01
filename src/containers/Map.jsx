import React from 'react'
//import imageURL from 'assets/Maps/01.png'

const L = require('leaflet')

class Map extends React.PureComponent {
	async componentDidMount () {
		const minZoom = 0
		const maxZoom = 5

		this.map = new L.Map('map', {
			minZoom,
			maxZoom,
			zoom: 1,
			center: [ 0, 0 ],
		})

		L.tileLayer('./tiles/{z}/{x}/{y}.png', {
			noWrap: true,
		}).addTo(this.map)
	}

	render () {
		return (
			<div id="map" />
		)
	}
}

export default Map
