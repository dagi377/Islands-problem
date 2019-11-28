import React from 'react';

function Header({onRandomize,onDraw,onMatrixChanged}) {
	return <header className="App-header">
		<input type="text" onChange={onMatrixChanged} placeholder={"Enter bit like this 1,2 Or 1 2  "}/>
		<button onClick={onRandomize}>Randomize</button>
		<button onClick={onDraw}>Draw</button>
	</header>
}

export default Header
