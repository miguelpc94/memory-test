import React, { useState, useReducer, useEffect, useCallback } from "react";

/* The game could be in any of the states below:
 * 'start' : The first state, where a button is shown to start the game
 * 'observe' : A temporary state where the random generate sequence is being demonstrated
 * 'replicate' : A state where the user will input the sequence just observed
 * 'congrats' : Congratulate the user for matching the sequence. Wait for the 'Next' button press
 * 'end' : The user got the sequence wrong. The game ends displaying the level the user reached
 **/

export const ConfigContext = React.createContext();

const updateBackgroundColor = gameState => {
	let color;
	switch (gameState) {
		case "start":
			color = "#0074D9"; //BLUE
			break;
		case "observe":
			color = "#FF851B"; //ORANGE
			break;
		case "replicate":
			color = "#39CCCC"; //TEAL
			break;
		case "congrats":
			color = "#2ECC40"; //GREEN
			break;
		case "end":
			color = "#FF4136"; //RED
			break;
		default:
			color = "#FFFFFF"; //WHITE
	}
	document.body.style.backgroundColor = color;
};

const useGameState = () => {
	const [gameLevel, setGameLevel] = useState(1);
	const [activeNumber, setActiveNumber] = useState(0);
	const [buttonSequence, setButtonSequence] = useState({
		sequenceAhead: [],
		next: -1
	});
	const [userSequence, setUserSequence] = useState([]);
	const [correctSequence, setCorrectSequence] = useState([]);

	// Game state reducer #####################

	const gameStateReducer = (state, action) => {
		let newState;
		switch (action.type) {
			case "buttonBoardControl":
				newState = action.data;
				break;
			case "startButtonPress":
				newState = "observe";
				break;
			case "tryAgainButtonPress":
				setGameLevel(1);
				newState = "observe";
				break;
			case "nextButtonPress":
				setGameLevel(action.data);
				newState = "observe";
				break;
			default:
				return state;
		}
		return newState;
	};
	const [gameState, dispatchGameState] = useReducer(gameStateReducer, "start");

	// Helpers ##############

	const generateNumber = () => {
		return 1 + Math.floor(Math.random() * 9);
	};

	const generateNumberSequence = useCallback(sequenceSize => {
		let numberSequence = [];
		let lastNumber = null;
		for (let index = 0; index < sequenceSize; index++) {
			let randomNumber = generateNumber();
			while (randomNumber === lastNumber) randomNumber = generateNumber();
			lastNumber = randomNumber;
			numberSequence.push(randomNumber);
		}
		return numberSequence;
	}, []);

	const generateButtonSequence = useCallback(() => {
		let buttonSequence = generateNumberSequence(1 + gameLevel);
		let [next, ...sequenceAhead] = [...buttonSequence];
		sequenceAhead.push(0);
		sequenceAhead.push(null);
		setCorrectSequence(buttonSequence);
		return { sequenceAhead, next };
	}, [gameLevel, generateNumberSequence]);

	const userIsWrong = useCallback(() => {
		if (userSequence.length === 0) return false;
		for (let index = 0; index < userSequence.length; index++) {
			if (userSequence[index] !== correctSequence[index]) return true;
		}
		return false;
	}, [correctSequence, userSequence]);

	const userIsDoneAndRight = useCallback(() => {
		if (userIsWrong()) return false;
		if (userSequence.length === correctSequence.length) return true;
	}, [correctSequence.length, userSequence.length, userIsWrong]);

	let isUserObserving = useCallback(
		() =>
			gameState === "observe" &&
			buttonSequence.next !== -1 &&
			buttonSequence.next !== null,
		[gameState, buttonSequence.next]
	);

	// Callbacks ####################

	// This updates the activeNumber and buttonSequence
	// It is executed during observe state in regular intervals
	const sequenceNextButton = useCallback(() => {
		let sequenceAhead = buttonSequence.sequenceAhead;
		let next = sequenceAhead.shift();
		setActiveNumber(buttonSequence.next);
		setButtonSequence({ sequenceAhead, next });
	}, [buttonSequence.sequenceAhead, buttonSequence.next]);

	// Determines what happens when you click the buttons
	let buttonClick = useCallback(
		number => {
			if (userSequence[userSequence.length - 1] !== number) {
				setActiveNumber(number);
				setUserSequence(userSequence.concat(number));
			}
		},
		[userSequence]
	);

	// Updates ########################

	useEffect(() => {
		updateBackgroundColor(gameState);
		// Executes when observe just started
		if (gameState === "observe" && buttonSequence.next === -1) {
			setButtonSequence(generateButtonSequence());
			setUserSequence([]);
			setActiveNumber(0);
		}
	}, [buttonSequence.next, gameState, generateButtonSequence]);

	useEffect(() => {
		if (gameState === "replicate" && userIsWrong()) {
			dispatchGameState({
				type: "buttonBoardControl",
				data: "end"
			});
			setButtonSequence({ sequenceAhead: [], next: -1 });
		}
		if (gameState === "replicate" && userIsDoneAndRight()) {
			dispatchGameState({
				type: "buttonBoardControl",
				data: "congrats"
			});
			setButtonSequence({ sequenceAhead: [], next: -1 });
		}
		// Determines what to do when observe is done
		if (gameState === "observe" && buttonSequence.next === null) {
			dispatchGameState({
				type: "buttonBoardControl",
				data: "replicate"
			});
			setButtonSequence({ sequenceAhead: [], next: -1 });
			setActiveNumber(0);
		}
		if (isUserObserving()) {
			const timeoutId = setTimeout(() => sequenceNextButton(), 1000);
			return () => clearTimeout(timeoutId);
		}
	}, [
		activeNumber,
		buttonSequence,
		gameState,
		isUserObserving,
		sequenceNextButton,
		userIsDoneAndRight,
		userIsWrong
	]);

	return {
		gameLevel,
		gameState,
		dispatchGameState,
		isUserObserving,
		sequenceNextButton,
		buttonClick,
		activeNumber
	};
};

export default useGameState;
