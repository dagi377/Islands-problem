import React from 'react';

function Board({bitmap,mode}) {
	return <div className={"board-container"}>
		{
			bitmap.map((nThRow)=><div>{JSON.stringify(nThRow)}</div>)
		}
	</div>
}

export default Board
