const fs = require('fs')
const sizeOf = require('image-size')

const Jimp = require('jimp')

const { spawn } = require('child_process')

const mkdirp = require('mkdirp')

const image = `${__dirname}/../src/assets/Maps/01.png`
const out = `${__dirname}/../public/maps`

const tileSize = 256

const getTotalTiles = (zoom) => {
	const files = fs.readdirSync(`${out}/${zoom}`)

	return files.length
}

const maxZoom = 5

const resizeMap = (zoom) => {
	if (zoom > 0) {
		console.log("Scale", Math.pow(2, (zoom - 1)) / 16, "zoom", zoom)
		Jimp.read(image, function (err, img) {
			img.scale(Math.pow(2, (zoom - 1)) / 16)
				.write(`${image}-${zoom}.png`)
		})

		return resizeMap(zoom - 1)
	}
}

const slice = async (zoom) => {
	mkdirp.sync(`${out}/${zoom}`)

	const converter = spawn(`convert`, [
		'-crop',
		`${tileSize}x${tileSize}`,
		'+repage',
		`${image}-${zoom}.png`,
		`${out}/${zoom}/tiles_%d.png`,
	])

	converter.on('close', async code => {
		const dimensions = await sizeOf(`${image}-${zoom}.png`)

		const tileAmount = getTotalTiles(zoom)

		const tilesPerCol = dimensions.width / tileSize

		let row = 0
		let col = 0

		console.log("tiles", tileAmount)

		Array(tileAmount).fill("").map((tile, i) => {
			let filename = `${out}/${zoom}/tiles_${i}.png`
			let targetName = `${out}/${zoom}/map_${col}_${row}.png`

			console.log(`Rename ${filename} to ${targetName}`)

			fs.renameSync(filename, targetName)
			col += 1

			if (col >= tilesPerCol) {
				col = 0
				row += 1
			}
		})
	})

	if (zoom > 0) {
		slice(zoom - 1)
	}
}

const main = async () => {
	const type = process.argv[2]

	if (!type) {
		throw new Error('No argument')
	}

	if (type === 'resize') {
		resizeMap(maxZoom)
		console.log('Resized.')
	} else {
		slice(maxZoom)
		console.log('Sliced')
	}
}

main()
