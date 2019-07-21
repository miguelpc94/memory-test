import React from "react";
import GameIntro from "./GameIntro";
import ButtonBoard from "./ButtonBoard";
import MessageDisplay from "./MessageDisplay";
import ShowLevel from "./ShowLevel";
import StateDependentButton from "./StateDependentButton";
import useGameState from "./useGameState";
import { ConfigContext } from "./useGameState";

const MemoryGame = () => {
	const configValue = useGameState();

	const { gameLevel, gameState, dispatchGameState } = configValue;

	const onStartButtonPress = () => {
		dispatchGameState({
			type: "startButtonPress",
			data: null
		});
	};
	const onTryAgainButtonPress = () => {
		dispatchGameState({
			type: "tryAgainButtonPress",
			data: null
		});
	};
	const onNextButtonPress = () => {
		dispatchGameState({
			type: "nextButtonPress",
			data: gameLevel + 1
		});
	};

	//console.log("MemoryGame component rendered");

	return (
		<ConfigContext.Provider value={configValue}>
			<div className="container memory-game">
				<GameIntro />
				<ButtonBoard />
				<br />
				<div className="row">
					<div className="col-4 center-block" style={{ textAlign: "center" }}>
						<MessageDisplay />
					</div>
				</div>
				<div className="row">
					<div className="col-12 center-block" style={{ textAlign: "center" }}>
						<ShowLevel />
					</div>
				</div>
				<br />
				<div className="row">
					<div className="col-4 center-block" style={{ textAlign: "center" }}>
						<StateDependentButton
							actualState={gameState}
							dependsOn="start"
							onClick={onStartButtonPress}
							text="start"
						/>
						<StateDependentButton
							actualState={gameState}
							dependsOn="congrats"
							onClick={onNextButtonPress}
							text="next"
						/>
						<StateDependentButton
							actualState={gameState}
							dependsOn="end"
							onClick={onTryAgainButtonPress}
							text="try again"
						/>
					</div>
				</div>
			</div>
		</ConfigContext.Provider>
	);
};

export default MemoryGame;
