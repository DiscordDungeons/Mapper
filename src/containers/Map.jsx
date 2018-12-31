import React from 'react'
import imageURL from 'assets/Maps/01.png'

const L = require('leaflet')


class Map extends React.PureComponent {
	componentDidMount () {
		this.map = new L.Map('map', {
			center: new L.LatLng(0, 0),
			zoom: 1,
			minZoom: 1,
			maxZoom: 5,
			layers: [
				L.tileLayer(`./maps/{z}/map_{x}_{y}.png`, {
					tileSize: 128,
				}),
			],
		})
	}

	//return `./maps/map_${coords.x}_${coords.y}.png`

	render () {
		return (
			<div id="map" />
		)
	}
}

export default Map
