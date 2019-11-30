import React from 'react';
import {getUniqueColor} from "./Utils";

const APPLICATION_MODES = {
	"ON_START": 1,
	"ON_DRAW": 0,
	"ON_SOLVED": 2

};

export const Header = ({onRandomize, onDraw, onDimensionUpdated, onCellSizeChange, onSolve}) => {
	return <div className="header">
		<span>Dimension n,m</span>
		<input type="text"
			   onBlur={onDimensionUpdated}
			   placeholder={"Bitmap size  1,2 or 1 2 or 1 $ 3 or 3.4  "}/>

		<button onClick={onRandomize}>Randomize</button>
		<button onClick={onDraw}>Draw</button>
		<span>Cell size </span><input type="text" onBlur={onCellSizeChange} placeholder={"Enter integer (2- 40), Try zooming "}/>
		<button onClick={onSolve}>Solve</button>
	</div>
}

export const InfoBar = ({islands, mode}) => <div className={"info-bar"}>
	<span className={"answer"}>{(islands !== null) && `This bitmap has ${islands} Islands`}</span>
	<span className={"draw-mode"}>{(APPLICATION_MODES.ON_DRAW === mode) ? `Drawing mode is ON` : ""}</span>
</div>


export const Cell = ({n, m, i, bit, cellSize, onCellDragged}) => {
	const color = bit ? (i ? getUniqueColor(i) : "black") : "transparent";
	const style = {
		backgroundColor: color,
		position: "absolute",
		left: cellSize * n,
		top: cellSize * m,
		minWidth: cellSize + "px",
		minHeight: cellSize + "px"
	};
	return <div
		data={JSON.stringify({n, m, bit, i})}
		draggable={true}
		style={style}
		onDragEnter={() => onCellDragged({n, m, bit})}/>
}

export const Board = ({bitmap, cellSize, onCellDragged}) => {
	const boardSize = {
		width: bitmap[0].length * cellSize + "px",
		height: bitmap.length * cellSize + "px"
	};
	return <div className={"board"} style={boardSize}>
		{
			bitmap.map((mThRow, mIndex) => <React.Fragment key={mIndex}>{
				mThRow.map((nThRow, nIndex) => {
					const cellInfo = bitmap[mIndex][nIndex]
					return <Cell
						cellSize={cellSize}
						{...cellInfo}
						key={`${cellInfo.n + "" + cellInfo.m}`}
						draggable={true}
						onCellDragged={onCellDragged}
					>
					</Cell>
				})
			}</React.Fragment>)
		}
	</div>
}

