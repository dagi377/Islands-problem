const regCaptureNumbers = /(\d+)([^\d]+)(\d+)/
const white = "rgb(255, 255,255)"
const black = "rgb(0, 0,0)"
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
	Array.from(Array(m).keys()).map((y) => {
		return bitmap[y] = Array.from(Array(n).keys()).map((x) => {
			const bit = isDrawing ? 0 : randomBit(density)
			return cell(x, y, bit)
		})
	});
	return bitmap
}

export const getRandomDimension = function () {
	const scale = Math.random() * 100
	const n = parseInt(Math.random() * scale + 15); //Make the value integer
	const m = parseInt(Math.random() * scale + 15);
	return [n, m]
}

const randomBit = (density = 0.55) => {
	return Math.round(Math.random() * density)
}

/**
 * Creates a cell with information about it's
 * position x
 * position y
 * bit  = 1 or 0   labelled or not labelled
 */

const cell = (n, m, bit) => {
	const c = bit ? black : white
	return {
		n, m, bit, c
	}
};

export const getUniqueColor = (islandIndex) => {
	const offset = (islandIndex * 150) % 255;
	const offset2 = (islandIndex * 20) % 255;
	const offset3 = (islandIndex * 200) % 255;
	return `rgb(${offset}, ${offset2},${offset3})`;
}

/**
 * Iteratively mark island or all connected cells with  value one
 * position j
 * position i
 * bitmap : 2D array  containing node information
 * island  : island value of the current cell
 * */
//Not pure function
export const markEveryAdjacentCell = (j, i, bitmap, island) => {
	for (let k = Math.max(0, j - 1); k <= Math.min(bitmap.length - 1, j + 1); k++) {
		for (let l = Math.max(0, i - 1); l <= Math.min(bitmap[0].length - 1, i + 1); l++) {
			if (!bitmap[k][l].i && bitmap[k][l].bit) {
				bitmap[k][l].i = island;
				bitmap[k][l].c = getUniqueColor(island);
				markEveryAdjacentCell(k, l, bitmap, island)
			}
		}
	}
}

/**
 * bitmap : 2D array
 * dimension :  the dimension of the bitmap
 */

export const countAndMarkIslands = (bitmap, dimension) => {
	const islands = [];
	const n = dimension[0];
	const m = dimension[1];
	for (let j = 0; j < m; j++) {
		for (let i = 0; i < n; i++) {
			if (bitmap[j][i].bit && !bitmap[j][i].i) {
				let islandValue = islands.length + 1;
				islands.push(islandValue)
				markEveryAdjacentCell(j, i, bitmap, islandValue)
			}
		}
	}
	return islands.length
}


