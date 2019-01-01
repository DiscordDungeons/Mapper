const { exec } = require('child_process')

// 0 is water

const inputPath = `${__dirname}/../Maps`

const mapGrid = [
	[ 3, 0, 0 ],
	[ 0, 1, 0 ],
	[ 2, 4, 0 ],
	[ 0, 0, 5 ],
]

const generateGrid = () => {
	let gridCommand = ''

	mapGrid.map(grid => {
		grid.map(tile => {
			if (tile === 0) {
				tile = 'water'
			}

			if (tile < 10) {
				tile = `0${tile}`
			}

			gridCommand = `${gridCommand} ${inputPath}/${tile}.png`
		})
	})

	return gridCommand
}

const main = async () => {
	exec(`montage ${generateGrid()} -tile ${mapGrid[0].length}x${mapGrid.length} -density 10000 -geometry +0+0 ${inputPath}/map.png`, (err, stdout) => {
		console.log("Done")
	})
}

main()
