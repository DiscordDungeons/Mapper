const { exec } = require('child_process')

const sizeOf = require('image-size')

const image = `${__dirname}/../Maps/map.png`
const out = `${__dirname}/../public/tiles`


const tileSize = 256

const main = async () => {
	const imageSize = await sizeOf(image)

	exec(`echo "l(${imageSize.width}/${tileSize})/l(2)" | bc -l`, (err, stdout) => {
		const maxZoom = Math.ceil(stdout)

		console.log('Max Zoom', maxZoom)

		exec(`python ${__dirname}/gdal2tiles.py -l -p raster -z 0-${maxZoom} -w none ${image} ${out}`)
	})
}

main()
