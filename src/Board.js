import React from 'react';

function Cell({n, m, bit, cellSize, onCellDragged}) {
	const style = {
		backgroundColor: bit ? "black" : "transparent",
		position: "absolute",
		left: cellSize * n,
		top: cellSize * m,
		minWidth: cellSize + "px",
		minHeight: cellSize + "px"
	};
	return <div draggable={true} style={style} onDragEnter={() => onCellDragged({n, m, bit})}></div>
}

function Board({dimension, bitmap, mode, cellSize, onCellDragged}) {
	return <div className={"board"} style={{width: (dimension[0] * cellSize) + "px"}}>
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

export default Board
