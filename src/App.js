import React from 'react';
import './App.css';
import {Header, InfoBar} from "./Components";
import {createBitmap, getRandomDimension, parseDimension} from "./Utils"
import Board from "./Board";
import config from "./Config";

const {cellSize, density} = config
const APPLICATION_MODES = {
	"ON_START": 1,
	"ON_DRAW": 0
};

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// Before we click Draw / Randomize
			mode: APPLICATION_MODES.ON_START,
			dimension: [],
			bitmap: null,
			cellSize,
			islands: null,
			density
		}

	}

	onDraw = () => {
		this.setState({mode: APPLICATION_MODES.ON_DRAW}, () => {
			this.onRandomize()
		})
	};

	updateBitmapState = (dimension) => {
		if (this.state.dimension !== dimension) {
			const bitmap = createBitmap(dimension, density, this.state.mode);
			this.setState({bitmap, dimension, islands: null})
		}
	};

	onRandomize = () => {
		const dimension = getRandomDimension();
		this.updateBitmapState(dimension)
	};

	onDimensionUpdated = (event) => {
		const dimension = parseDimension(event.target.value);
		return dimension ? this.updateBitmapState(dimension) : false;
	};

	componentDidMount() {
		this.onRandomize()
	}

	onCellSizeChange = (event) => {
		const cellSize = parseInt(event.target.value);
		const cellSizeValid = !isNaN(cellSize) && cellSize < 40 && cellSize > 1;
		if (cellSizeValid) {
			this.setState({cellSize})
		}
	};

	onCellDragged = (cellInfo) => {
		const isDrawMode = this.state.mode === APPLICATION_MODES.ON_DRAW
		if (!isDrawMode) {
			return
		}
		const bitmap = this.state.bitmap;
		bitmap[cellInfo.m][cellInfo.n].bit = 1
		this.setState({
			bitmap
		})
	};

	markEveryCell = (j, i, bitmap, island) => {
		for (let k = Math.max(0, j - 1); k <= Math.min(bitmap.length - 1, j + 1); k++) {
			for (let l = Math.max(0, i - 1); l <= Math.min(bitmap[0].length - 1, i + 1); l++) {
				if (bitmap[k][l].i == undefined && bitmap[k][l].bit) {
					bitmap[k][l].i = island;
					this.markEveryCell(k, l, bitmap, island)
				}
			}
		}
	}
	onSolve = () => {
		const {bitmap, dimension} = this.state;
		const mode = APPLICATION_MODES.ON_START
		const islands = [];
		const n = dimension[0];
		const m = dimension[1];
		for (let j = 0; j < m; j++) {
			for (let i = 0; i < n; i++) {
				if (bitmap[j][i].bit) {
					// if already visited the i value is the island
					if (bitmap[j][i].i == undefined) {
						let islandValue = islands.length + 1
						islands.push(islandValue)
						this.markEveryCell(j, i, bitmap, islandValue)
					}
				}
			}
		}
		this.setState({bitmap, islands: islands.length, mode})
	};

	render() {
		const {onRandomize, onDraw, onDimensionUpdated, onCellSizeChange, onCellDragged, onSolve} = this;
		const {bitmap, dimension, mode, cellSize, islands} = this.state;
		return <div className="App">
			<Header dimension={dimension}
					onDimensionUpdated={onDimensionUpdated}
					onRandomize={onRandomize}
					onCellSizeChange={onCellSizeChange}
					onDraw={onDraw}
					onSolve={onSolve}/>
			{bitmap &&
			<div className={"board-container"}>
				<InfoBar dimension={dimension} islands={islands} mode={mode}/>
				<Board
					bitmap={bitmap}
					mode={mode}
					dimension={dimension}
					cellSize={cellSize}
					onCellDragged={onCellDragged}/>
			</div>
			}
		</div>
	}

}

export default App;
