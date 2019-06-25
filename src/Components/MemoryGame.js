import React, { useState, useReducer, useContext } from 'react';
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

export const ConfigContext = React.createContext();

const useGameState = () => {
    const [gameLevel, setGameLevel] = useState(1);

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

    const gameStateReducer = (state, action) => {
        let newState;
        switch (action.type) {
            case 'buttonBoardControl':
                newState = action.data;
                break
            case 'startButtonPress':
                newState = 'observe';
                break
            case 'tryAgainButtonPress':
                setGameLevel(1);
                newState = 'observe';
                break;
            case 'nextButtonPress':
                setGameLevel(action.data);
                newState = 'observe';
                break;
            default: 
                return state;
        }
        updateBackgroundColor(newState);
        return newState;
    }

    const [gameState, dispatchGameState] = useReducer(gameStateReducer, 'start');

    updateBackgroundColor(gameState);

    return {
        gameLevel,
        gameState,
        dispatchGameState
    };
};


const MemoryGame = () => {

    const configValue = useGameState();

    const {
        gameLevel,
        gameState,
        dispatchGameState
    } = configValue;

    const onStartButtonPress = () => {
        dispatchGameState({
            type: 'startButtonPress',
            data: null
        });
    }

    const onTryAgainButtonPress = () => {
        dispatchGameState({
            type: 'tryAgainButtonPress',
            data: null
        });
    }

    const onNextButtonPress = () => {
        dispatchGameState({
            type: 'nextButtonPress',
            data: gameLevel+1
        });
    }

    // The button board will replicate the sequence if gameState==='observe'
    return (
        <ConfigContext.Provider value={configValue} >
            <div className="container memory-game">
                <GameHeader />
                <GameIntro />
                <ButtonBoard />
                <br />
                <div className="row">
                    <div className="col-4 center-block" style={{"text-align": "center"}}>
                        <MessageDisplay gameState={gameState} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 center-block" style={{"text-align": "center"}}>
                        <ShowLevel gameState={gameState} gameLevel={gameLevel} />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-4 center-block" style={{"text-align": "center"}}>
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
                </div>
            </div>
        </ConfigContext.Provider>
    );
};

export default MemoryGame;