import React from 'react';
import './App.css';
import Header from "./Header";
import {getBitMap} from "./Utils"

const APPLICATION_MODES = [
	"START",
	"IN_GAME"
]

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			// Before we click Draw / Randomize
			mode: APPLICATION_MODES[0],
			bitMap: []
		}
	}

	onDraw = () => {

	}

	onRandomize = () => {

	}

	onMatrixChanged = (e) => {
		const bitMap = getBitMap(e.target.value)
		if (!bitMap) {
			//means bitMap not valid
			return false
		}
		console.log(bitMap)
		this.setState({bitMap: bitMap})
	}

	render() {
		const {onRandomize, onDraw, onMatrixChanged} = this
		const greeting = <div className={"greeting"}>Click to play</div>
		return (
			<div className="App">
				<Header onMatrixChanged={onMatrixChanged} onRandomize={onRandomize} onDraw={onDraw}></Header>
				{this.state == APPLICATION_MODES[0] ? greeting : null}
			</div>
		);
	}

}

export default App;
