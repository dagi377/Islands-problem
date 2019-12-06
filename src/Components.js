import React from 'react';

const APPLICATION_MODES = {
	"ON_START": 1,
	"ON_DRAW": 0,
	"ON_SOLVED": 2

};

export const Header = ({onRandomize, onDimensionUpdated, onCellSizeChange, onSolve}) => {
	return <div className="header">
		<span>Dimension n,m</span>
		<input type="text"
			   onBlur={onDimensionUpdated}
			   placeholder={"Bitmap size  1,2 or 1 2 or 1 $ 3 or 3.4  "}/>

		<button onClick={onRandomize}>Randomize</button>
		<span>Cell size </span><input type="text" onBlur={onCellSizeChange}
									  placeholder={"Enter integer (80 - 250), Try zooming "}/>
		<button onClick={onSolve}>Solve</button>
	</div>
}

export const InfoBar = ({dimension, islands, mode}) => <div className={"info-bar"}>
	{dimension && <span className={"dimension"}>{`(n,m)=(${dimension[0] + "," + dimension[1]})`}</span>}
	<span className={"answer"}>{(islands !== null) && `This bitmap has ${islands} Islands`}</span>
	<span className={"draw-mode"}>{(APPLICATION_MODES.ON_DRAW === mode) ? `Drawing mode is ON` : ""}</span>
</div>

