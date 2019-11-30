import React,{useState} from 'react';

function Header({dimension,onRandomize, onDraw, onDimensionUpdated, onCellSizeChange,onSolve}) {
	return <header className="App-header">
		<input type="text"
			   onChange={onDimensionUpdated}
			   value={dimension}
			   placeholder={"Bitmap size  1,2 or 1 2 or 1 $ 3 or 3.4  "}/>

		<button onClick={onRandomize}>Randomize</button>
		<button onClick={onDraw}>Draw</button>
		<input type="text" onChange={onCellSizeChange} placeholder={"Cell dimension (integer) i.e 2, 4 , 20 "}/>
		<button onClick={onSolve}>Solve</button>
	</header>
}

export default Header
