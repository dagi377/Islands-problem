import React from 'react';

const APPLICATION_MODES = {
	"ON_START": 1,
	"ON_DRAW": 0
};

export const Header = ({onRandomize, onDraw, onDimensionUpdated, onCellSizeChange, onSolve}) => {
	return <header className="App-header">
		<input type="text"
			   onChange={onDimensionUpdated}
			   placeholder={"Bitmap size  1,2 or 1 2 or 1 $ 3 or 3.4  "}/>

		<button onClick={onRandomize}>Randomize</button>
		<button onClick={onDraw}>Draw</button>
		<input type="text" onChange={onCellSizeChange} placeholder={"Enter integer (2- 40), Try zooming "}/>
		<button onClick={onSolve}>Solve</button>
	</header>
}

export const InfoBar = ({dimension, islands, mode}) => <div className={"info-bar"}>
	{`Displaying results for ${dimension} `}
	<span className={"answer"}>{(islands !== null) && `This bitmap has ${islands} Islands`}</span>
	<span className={"draw-mode"}>{(APPLICATION_MODES.ON_DRAW === mode) ? `Drawing mode is ON` : ""}</span>
</div>
