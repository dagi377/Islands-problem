import React from 'react';
import './App.css';
import Header from "./Header";
import {parseDimension, getRandomBitmap,createBitmap} from "./Utils"
import Board from "./Board";

const APPLICATION_MODES = {
	"ON_START": 1,
	"ON_DRAW": 2
};

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// Before we click Draw / Randomize
			mode: APPLICATION_MODES.ON_START,
			bitMap: []
		}

	}

	onDraw = () => {
		this.setState({mode: APPLICATION_MODES.ON_DRAW})
	};

	updateBitmap = (bitMap) => {
		this.setState({bitMap: bitMap})
	};

	onRandomize = () => {
		this.updateBitmap(getRandomBitmap())
	};

	onMatrixChanged = (e) => {
		const dimension = parseDimension(e.target.value);
		return dimension ? this.updateBitmap(createBitmap(dimension)) : false;
	};
	componentDidMount() {
		this.updateBitmap(getRandomBitmap())
	}

	render() {
		const {onRandomize, onDraw, onMatrixChanged} = this;
		const greeting = <div className={"greeting"}>Click to play</div>;
		return (
			<div className="App">
				<Header onMatrixChanged={onMatrixChanged} onRandomize={onRandomize} onDraw={onDraw}></Header>
				{this.state == APPLICATION_MODES[0] ? greeting : <Board bitmap={this.state.bitMap} mode={this.mode}/>}
			</div>
		);
	}

}

export default App;
