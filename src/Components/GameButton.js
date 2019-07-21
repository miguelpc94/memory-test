import React, { useContext, useMemo } from "react";
import { ConfigContext } from "./useGameState";

const GameButton = props => {
	const context = useContext(ConfigContext);

	const isActive = useMemo(() => context.activeNumber === props.number, [
		props.number,
		context.activeNumber
	]);

	return useMemo(() => {
		let color = props.color;

		const dimColor = () => {
			return color.map(color => color * 0.5);
		};

		color = isActive ? color : dimColor();

		let onClick =
			context.gameState === "replicate" ? context.buttonClick : number => null;

		//console.log(`GameButton ${props.number} component rendered`);

		return (
			<div
				className="game-button"
				onClick={() => onClick(props.number)}
				style={{ background: `rgb(${color[0]},${color[1]},${color[2]})` }}
			/>
		);
	}, [
		props.color,
		props.number,
		isActive,
		context.gameState,
		context.buttonClick
	]);
};

export default GameButton;
