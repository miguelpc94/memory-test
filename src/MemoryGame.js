import React, { useState } from 'react';

/* The game could be in any of the states below:
 * 'start' : The first state, where a button is shown to start the game
 * 'observe' : A temporary state where the random generate sequence is being demonstrated
 * 'replicate' : A state where the user will input the sequence just observed
 * 'congrats' : Congratulate the user for matching the sequence. Wait for the 'Next' button press
 * 'end' : The user got the sequence wrong. The game ends displaying the level the user reached
**/


const useGameState = () => {
    const {gameState, setGameState} = useState('start');

    const updateBackgroundColor = (gameState) => {
        let color;
        switch(gameState) {
            case 'start':
                color = "#0074D9"; //BLUE
                break;
            case 'observe':
                color = "#FF851B"; //ORANGE
                break;
            case 'replicate':
                color = "#39CCCC"; //TEAL
                break;
            case 'congrats':
                color = "#2ECC40"; //GREEN
                break;
            case 'end':
                color = "#FF4136"; //RED
                break;
            default:
                color = "#FFFFFF"; //WHITE
        }
        document.body.style.backgroundColor = color;
    }

    const updateGameState = (newGameState) => {
        updateBackgroundColor(newGameState);
        setGameState(newGameState);
    }

    updateBackgroundColor(gameState);

    return {
        gameState,
        setGameState: updateGameState
    };
};

const stateSwitcher = (state) => {
    switch(state) {
        case 'start':
            return 'observe';
        case 'observe':
            return 'replicate';
        case 'replicate':
            return 'congrats';
        case 'congrats':
            return 'end';
        default:
            return 'start';
    }
};

const MemoryGame = () => {

    const {
        gameState,
        setGameState
    } = useGameState();

    setInterval(() => setGameState(stateSwitcher(gameState)),1000);

    return (
        <div className="App">
          <header className="App-header">
            <h1>
              Memory test
            </h1>
          </header>
        </div>
    );
};

export default MemoryGame;