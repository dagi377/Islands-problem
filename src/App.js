import React from 'react';
import './App.css';
import {Header, InfoBar} from "./Components";
import {countAndMarkIslands, createBitmap, getRandomDimension, parseDimension} from "./Utils"
import config from "./Config";
import Board from "./Board"

const {cellSize, density} = config
const APPLICATION_MODES = {
	"ON_START": 1,
	"ON_DRAW": 0,
	"ON_SOLVED": 2
};
const height = window.innerHeight - 80;
const width = window.innerWidth - 50;
const canvasContainer = {
	maxWidth: `${width}px`,
	maxHeight: `${height}px`,
	position: "absolute",
	left: "20px",
	minWidth: `${width}px`,
	minHeight: `${height}px`,
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: APPLICATION_MODES.ON_START,
			dimension: [],
			bitmap: null,
			cellSize: 150,
			islands: null,
			density
		}

	}

	updateBitmapState = (dimension, mode) => {
		const bitmap = createBitmap(dimension, density, mode);
		this.setState({bitmap, dimension, mode, islands: null})
	};

	onRandomize = (mode) => {
		let {dimension} = this.state
		this.setState({mode}, () => {
			dimension = dimension.length ? dimension : getRandomDimension();
			this.updateBitmapState(dimension, mode)
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
		const cellSizeValid = !isNaN(cellSize) && cellSize > 80 && cellSize < 250;
		if (cellSizeValid) {
			this.setState({cellSize})
		}
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
		const {onRandomize, onDimensionUpdated, onCellSizeChange, onSolve} = this;
		const {bitmap, dimension, mode, islands} = this.state;
		if (bitmap) {
			Board.create(bitmap, this.state.cellSize)
		}

		return <div className="App">
			<Header
				onDimensionUpdated={onDimensionUpdated}
				onRandomize={onRandomize}
				onCellSizeChange={onCellSizeChange}
				onSolve={onSolve}/>
			{bitmap &&
			<div className={"board-container"}>
				<InfoBar dimension={dimension} islands={islands} mode={mode}/>
			</div>}
			<div className={"canvas-container"} style={canvasContainer}></div>
		</div>
	}

}

export default App;
