import React from "react";
import GameButton from "./GameButton";

const buttonColors = [
	[0x7f, 0xdb, 0xff],
	[0xff, 0xdc, 0x00],
	[0x01, 0xff, 0x70],
	[0xf0, 0x12, 0xbe],
	[0x39, 0xcc, 0xcc],
	[0xb1, 0x0d, 0xc9],
	[0xff, 0x85, 0x1b],
	[0x00, 0x74, 0xd9],
	[0xff, 0x41, 0x36]
];

const ButtonBoard = React.memo(() => {
	//console.log("ButtonBoard component rendered");

	// Lay the buttons on the board
	let buttons = [];
	for (let number = 0; number < 9; number++) {
		buttons.push(
			<GameButton
				key={number}
				color={buttonColors[number]}
				number={number + 1}
			/>
		);
	}

	return (
		<div className="row">
			<div className="col-4 button-board center-block">{buttons}</div>
		</div>
	);
});

export default ButtonBoard;
