import React, { useState } from 'react';
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
    const [gameLevel, setGameLevel] = useState(1);
    const [buttonSequence, setButtonSequence] = useState([]);

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
        buttonSequence,
        setButtonSequence,
        gameLevel,
        setGameLevel,
        gameState,
        setGameState: updateGameState
    };
};

const MemoryGame = () => {

    const {
        gameLevel,
        setGameLevel,
        gameState,
        setGameState
    } = useGameState();

    const onStartButtonPress = () => {
        setGameState('observe');
    }

    const onTryAgainButtonPress = () => {
        setGameLevel(1);
        setGameState('observe');
    }

    const onNextButtonPress = () => {
        setGameLevel(gameLevel+1);
        setGameState('observe');
    }

    // The button board will replicate the sequence if gameState==='observe'
    return (
        <div className="memory-game">
            <GameHeader />
            <GameIntro gameState={gameState} />
            <ButtonBoard
                gameState={gameState}
                setGameState={setGameState}
                gameLevel={gameLevel}
            />
            <MessageDisplay gameState={gameState} />
            <ShowLevel gameState={gameState} gameLevel={gameLevel} />
            <br />
            <br />
            <StateDependentButton 
                actualState={gameState}
                dependsOn='start'
                onClick={onStartButtonPress}
                text='start'
            />
            <StateDependentButton 
                actualState={gameState}
                dependsOn='congrats'
                onClick={onNextButtonPress}
                text='next'
            />
            <StateDependentButton 
                actualState={gameState}
                dependsOn='end'
                onClick={onTryAgainButtonPress}
                text='try again'
            />
        </div>
    );
};

export default MemoryGame;