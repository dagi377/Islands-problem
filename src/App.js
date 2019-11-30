import React from 'react';
import './App.css';
import Header from "./Header";
import {createBitmap, getRandomDimension, parseDimension} from "./Utils"
import Board from "./Board";
import config from "./Config";

const APPLICATION_MODES = {
	"ON_START": 1,
	"ON_DRAW": 2
};

class App extends React.Component {
	constructor(props) {
		super(props);
		const {cellSize, density} = config
		this.state = {
			// Before we click Draw / Randomize
			mode: APPLICATION_MODES.ON_START,
			dimension: [],
			bitmap: null,
			cellSize,
			density
		}

	}

	onDraw = () => {
		this.setState({mode: APPLICATION_MODES.ON_DRAW})
	};

	updateBitmapState = (dimension) => {
		const bitmap = createBitmap(dimension, this.state.density);
		//Only update on dimension is different and update states together
		if (this.state.dimension != dimension) {
			const mode = APPLICATION_MODES.ON_DRAW;
			this.setState({mode, bitmap, dimension})
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
	}

	onCellDragged = (cellInfo) => {
		const bitmap = this.state.bitmap;
		bitmap[cellInfo.m][cellInfo.n].bit = Math.abs(cellInfo.bit - 1)
		this.setState({
			bitmap
		})
	}

	onSolve = () => {
		if (!dimension && !this.state.bitmap) {
			return false
		}
		const bitmap = this.state.bitmap
		const dimension = this.state.dimension
		const islands = []
		const n = dimension[0]
		const m = dimension[1]
		for (let j = 0; j < m; i++) {
			for (let i = 0; i < n; i++) {
				if (bitmap[j][i].bit) {
					const island = islands.length + 1
					if (!islands.includes(island)) {
						islands.push(island)
						bitmap[j][i].i = island
					}
					// findAndMarkAdjacent
					for (let k = Math.max(0, j - 1); k <= Math.min(m, j + 1); k++) {
						for (let l = Math.max(0, i - 1); l <= Math.min(n, i + 1); l++) {
							bitmap[k][l].i = island
						}
					}
				}
			}
		}

		console.log(this.state.bitmap)
		console.log(bitmap)
	}

	render() {
		const {onRandomize, onDraw, onDimensionUpdated, onCellSizeChange, onCellDragged, onSolve} = this;
		const {bitmap, dimension, mode, cellSize} = this.state;
		const Greeting = <div className={"greeting"}>Click to play</div>;
		const showGreeting = mode === APPLICATION_MODES.ON_START;
		return <div className="App">
			<Header dimension={dimension}
					onDimensionUpdated={onDimensionUpdated}
					onRandomize={onRandomize}
					onCellSizeChange={onCellSizeChange}
					onDraw={onDraw}
					onSolve={onSolve}/>
			{
				showGreeting ? Greeting :
					<div className={"board-container"}>
						<div className={"dimension"}>{`Displaying results for ${dimension}`} </div>
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
