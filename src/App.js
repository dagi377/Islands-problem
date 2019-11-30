import React from 'react';
import './App.css';
import {Board, Header, InfoBar} from "./Components";
import {countAndMarkIslands, createBitmap, getRandomDimension, parseDimension} from "./Utils"
import config from "./Config";

const {cellSize, density} = config
const APPLICATION_MODES = {
	"ON_START": 1,
	"ON_DRAW": 0,
	"ON_SOLVED": 2
};

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: APPLICATION_MODES.ON_START,
			dimension: [],
			bitmap: null,
			cellSize,
			islands: null,
			density
		}

	}

	onDraw = () => {
		this.onRandomize(APPLICATION_MODES.ON_DRAW, this.state.dimension)
	};

	updateBitmapState = (dimension, mode) => {
		const bitmap = createBitmap(dimension, density, mode);
		this.setState({bitmap, dimension, mode, islands: null})
	};

	onRandomize = (mode, dimension) => {
		this.setState({mode}, () => {
			const newDimension = dimension || getRandomDimension();
			this.updateBitmapState(newDimension, mode)
		})

	};

	onDimensionUpdated = (event) => {
		const dimension = parseDimension(event.target.value);
		if (dimension) {
			this.updateBitmapState(dimension, APPLICATION_MODES.ON_START)
		}
	};

	componentDidMount() {
		this.onRandomize(APPLICATION_MODES.ON_START)
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


	onSolve = () => {
		const {mode, bitmap, dimension} = this.state;
		if (mode === APPLICATION_MODES.ON_SOLVED) {
			return
		}

		const islands = countAndMarkIslands(bitmap, dimension)
		this.setState({bitmap, islands, mode: APPLICATION_MODES.ON_SOLVED})
	};

	render() {
		const {onRandomize, onDraw, onDimensionUpdated, onCellSizeChange, onCellDragged, onSolve} = this;
		const {bitmap, dimension, mode, cellSize, islands} = this.state;

		return <div className="App">
			<Header
				onDimensionUpdated={onDimensionUpdated}
				onRandomize={onRandomize}
				onCellSizeChange={onCellSizeChange}
				onDraw={onDraw}
				onSolve={onSolve}/>
			{bitmap &&
			<div className={"board-container"}>
				<InfoBar islands={islands} mode={mode}/>
				<Board
					bitmap={bitmap}
					mode={mode}
					cellSize={cellSize}
					onCellDragged={onCellDragged}/>
			</div>
			}
		</div>
	}

}

export default App;
