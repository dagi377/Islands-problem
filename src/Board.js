import React from 'react';

const getUniqueColor = (islandIndex) => {
	const offset = (islandIndex * 10) % 255;
	const offset2 = (islandIndex * 30) % 255;
	const offset3 = (islandIndex * 50) % 255;

	return `rgb(${offset}, ${offset2},${offset3})`;
}

function Cell({n, m, i, bit, cellSize, onCellDragged}) {
	const color = bit ? ( i ? getUniqueColor(i) : "black") : "transparent";
	const style = {
		backgroundColor: color,
		position: "absolute",
		left: cellSize * n,
		top: cellSize * m,
		minWidth: cellSize + "px",
		minHeight: cellSize + "px"
	};
	return <div
		data={JSON.stringify({n,m,bit,i})}
		draggable={true}
		style={style}
		onDragEnter={() => onCellDragged({n, m, bit})}/>
}

function Board({dimension, bitmap, cellSize, onCellDragged}) {
	const boardSize = {
		width: (dimension[0] * cellSize) + "px",
		height: (dimension[1] * cellSize) + "px"
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

export default Board
