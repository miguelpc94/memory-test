import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GameHeader from "./GameHeader";
import MemoryGame from "./MemoryGame";
import About from "./About";

function App() {
	return (
		<Router>
			<div className="container memory-game">
				<GameHeader className="memory-game" />
			</div>
			<Route exact path="/" component={MemoryGame} />
			<Route exact path="/about" component={About} />
		</Router>
	);
}

export default App;
