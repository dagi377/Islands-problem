const regCaptureNumbers = /(\d+)([^\d]+)(\d+)/
export const parseDimension = function (value) {
	const regResult = new RegExp(regCaptureNumbers).exec(value)
	if (!regResult) {
		return false
	}
	const n = parseInt(regResult[1])
	const m = parseInt(regResult[3])
	if (!n || !m) {
		return false
	}
	return [n, m]
}


export const createBitmap = (dimension, density, mode) => {
	const n = dimension[0]
	const m = dimension[1]
	const isDrawing = mode === 0
	const bitmap = new Array(m)
	//Create 2D array from dimensions with rand bit assigned to each
	Array.from(Array(m).keys()).map((y) => {
		return bitmap[y] = Array.from(Array(n).keys()).map((x) => {
			const bit = isDrawing ? 0 : randomBit(density)

			return cell(x, y, bit)
		})
	});
	return bitmap
}

// creates random bitmap Uses getBitmap with random dimnsion
export const getRandomDimension = function () {
	const scale = Math.random() * 100
	const n = parseInt(Math.random() * scale + 5); //Make the value integer
	const m = parseInt(Math.random() * scale + 5);
	return [n, m]
}

// Generate 0 or 1 randomly
const randomBit = (density = 0.6) => {
	// let's increase the the number  of Islands by decreasing the density
	return Math.round(Math.random() * density)
}

//Creates a cell with information about it's
// position x
// position y
// position bit which is tells if the cell labelled or not.
const cell = (n, m, bit) => {
	return {
		n, m, bit
	}
}
