import React, { useState, useEffect } from 'react';
import GameHeader from './GameHeader';
import GameIntro from './GameIntro';
import ButtonBoard from './ButtonBoard';
import MessageDisplay from './MessageDisplay';
import ShowLevel from './ShowLevel';
import StateDependentButton from './StateDependentButton';


/* The game could be in any of the states below:
 * 'start' : The first state, where a button is shown to start the game
 * 'observe' : A temporary state where the random generate sequence is being demonstrated
 * 'replicate' : A state where the user will input the sequence just observed
 * 'congrats' : Congratulate the user for matching the sequence. Wait for the 'Next' button press
 * 'end' : The user got the sequence wrong. The game ends displaying the level the user reached
**/


const useGameState = () => {
    const [gameState, setGameState] = useState('start');
    const [activeNumber, setActiveNumber] = useState(0);
    const [gameLevel, setGameLevel] = useState(0);

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
        gameLevel,
        setGameLevel,
        activeNumber,
        setActiveNumber,
        gameState,
        setGameState: updateGameState
    };
};

const stateSwitcher = (state) => { // FOR DEBUG
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
        gameLevel,
        setGameLevel,
        activeNumber,
        setActiveNumber,
        gameState,
        setGameState
    } = useGameState();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setGameState(stateSwitcher(gameState));
            setActiveNumber(1+Math.floor(Math.random()*9));
        },2000);
        return () => clearTimeout(timeoutId);
    });

    // The button board will replicate the sequence if gameState==='observe'
    return (
        <div className="memory-game">
            <GameHeader />
            <GameIntro gameState={gameState} />
            <ButtonBoard
                replicateSequence={[]}
                gameState={gameState}
                setGameState={setGameState}
                activeNumber={activeNumber} 
            />
            <MessageDisplay gameState={gameState} />
            <ShowLevel gameState={gameState} gameLevel={gameLevel} />
            <br />
            <br />
            <StateDependentButton 
                actualState={gameState}
                dependsOn='start'
                onClick={() => console.log("Start game")}
                text='start'
            />
            <StateDependentButton 
                actualState={gameState}
                dependsOn='congrats'
                onClick={() => console.log("Next sequence")}
                text='next'
            />
            <StateDependentButton 
                actualState={gameState}
                dependsOn='end'
                onClick={() => console.log("Try a new game")}
                text='try again'
            />
        </div>
    );
};

export default MemoryGame;