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


export const createBitmap = (dimension) => {
	const n = dimension[0]
	const m = dimension[1]

	const bitmap = new Array(m)
	//Create 2D array from dimensions with rand bit assigned to each
	Array.from(Array(m).keys()).map((y) => {
		bitmap[y] = Array.from(Array(n).keys()).map((x) => {
			return cell(x, y, randomBit())
		})
	});
	return bitmap
}

// creates random bitmap Uses getBitmap with random dimnsion
export const getRandomBitmap = function () {
	const scale = Math.random() * 100
	const n = parseInt(Math.random() * scale); //Make the value integer
	const m = parseInt(Math.random() * scale);
	console.log("on random", n + " " + m)
	return createBitmap([n, m])
}

// Generate 0 or 1 randomly
const randomBit = () => {
	return Math.round(Math.random())
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
